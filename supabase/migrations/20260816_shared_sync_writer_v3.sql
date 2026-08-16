-- Stop legacy v2 dashboard tabs from looping on revision conflicts.
-- Deploy the v3 writer and client before revoking v2 during a staged rollout.

create or replace function public.save_workspace_snapshot_v3(
  target_station uuid,
  target_date date,
  expected_revision bigint,
  new_payload jsonb,
  action_name text default 'workspace.save'
)
returns workspace_snapshots
language plpgsql
security invoker
as $$
declare current_row workspace_snapshots; target_org uuid;
begin
  select organization_id into target_org from stations where id=target_station;
  if target_org is null
    or not can_access_station(target_station)
    or not has_org_role(target_org,array['owner','ops_manager','dispatcher','fleet_lead']::relayops_role[])
  then
    raise exception 'not authorized';
  end if;

  select * into current_row
  from workspace_snapshots
  where station_id=target_station and operation_date=target_date
  for update;

  if found and current_row.payload=new_payload then
    return current_row;
  end if;
  if found and current_row.revision<>expected_revision then
    raise exception 'revision_conflict' using errcode='40001';
  end if;

  insert into workspace_snapshots(organization_id,station_id,operation_date,revision,payload,updated_by)
  values(target_org,target_station,target_date,1,new_payload,auth.uid())
  on conflict(station_id,operation_date) do update
  set revision=workspace_snapshots.revision+1,
      payload=excluded.payload,
      updated_at=now(),
      updated_by=auth.uid()
  returning * into current_row;

  insert into audit_log(organization_id,station_id,action,entity,metadata)
  values(target_org,target_station,action_name,'workspace',jsonb_build_object('operation_date',target_date,'revision',current_row.revision));
  return current_row;
end;
$$;

grant execute on function public.save_workspace_snapshot_v3(uuid,date,bigint,jsonb,text) to authenticated;

-- Run only after the v3 browser client is published and verified. The guard
-- keeps this migration valid for fresh projects that never created v2.
do $$
begin
  if to_regprocedure('public.save_workspace_snapshot_v2(uuid,date,bigint,jsonb,text)') is not null then
    execute 'revoke execute on function public.save_workspace_snapshot_v2(uuid,date,bigint,jsonb,text) from public, anon, authenticated';
  end if;
end;
$$;
