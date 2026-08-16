-- Apply only after the v4 browser client is published and verified.
-- This prevents older tabs from recreating an expired operation-date row.

do $$
begin
  if to_regprocedure('public.save_workspace_snapshot_v3(uuid,date,bigint,jsonb,text)') is not null then
    execute 'revoke execute on function public.save_workspace_snapshot_v3(uuid,date,bigint,jsonb,text) from public, anon, authenticated';
  end if;
end;
$$;

