import {createClient} from 'https://esm.sh/@supabase/supabase-js@2';

const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type'};
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{...cors,'Content-Type':'application/json'}});

Deno.serve(async request=>{
  if(request.method==='OPTIONS')return new Response('ok',{headers:cors});
  try{
    const url=Deno.env.get('SUPABASE_URL')!,anon=Deno.env.get('SUPABASE_ANON_KEY')!,service=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const authorization=request.headers.get('Authorization')||'';
    const caller=createClient(url,anon,{global:{headers:{Authorization:authorization}}});
    const admin=createClient(url,service,{auth:{autoRefreshToken:false,persistSession:false}});
    const {data:{user},error:userError}=await caller.auth.getUser();
    if(userError||!user)return json({error:'Unauthorized'},401);
    const body=await request.json();
    const email=String(body.email||'').trim().toLowerCase(),organizationId=String(body.organizationId||''),stationId=String(body.stationId||''),displayName=String(body.displayName||'').trim();
    const allowedRoles=['ops_manager','dispatcher','fleet_lead','viewer'];
    const role=allowedRoles.includes(body.role)?body.role:'viewer';
    if(!email||!organizationId||!stationId)return json({error:'Email, organization, and station are required'},400);
    const {data:membership}=await caller.from('memberships').select('role').eq('organization_id',organizationId).eq('user_id',user.id).eq('active',true).maybeSingle();
    if(!membership||membership.role!=='owner')return json({error:'Owner access required'},403);
    const redirectTo=String(body.redirectTo||'');
    const {data:invite,error:inviteError}=await admin.auth.admin.inviteUserByEmail(email,{redirectTo,data:{display_name:displayName,organization_id:organizationId,station_id:stationId}});
    if(inviteError)return json({error:inviteError.message},400);
    const invitedUser=invite.user;
    const {error:membershipError}=await admin.from('memberships').upsert({organization_id:organizationId,user_id:invitedUser.id,role,display_name:displayName||email,active:true});
    if(membershipError)return json({error:membershipError.message},400);
    const {error:stationError}=await admin.from('station_memberships').upsert({station_id:stationId,user_id:invitedUser.id});
    if(stationError)return json({error:stationError.message},400);
    await admin.from('audit_log').insert({organization_id:organizationId,station_id:stationId,user_id:user.id,action:'member.invite',entity:'membership',metadata:{invited_user_id:invitedUser.id,email,role}});
    return json({ok:true,userId:invitedUser.id,email,role});
  }catch(error){return json({error:error instanceof Error?error.message:'Unexpected error'},500);}
});
