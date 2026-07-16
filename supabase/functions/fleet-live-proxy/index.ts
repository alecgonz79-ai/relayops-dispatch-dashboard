import {createClient} from 'https://esm.sh/@supabase/supabase-js@2';

const allowedOrigins=String(Deno.env.get('FLEET_PROXY_ALLOWED_ORIGINS')||'')
  .split(',')
  .map(value=>value.trim())
  .filter(Boolean);

function requestOrigin(request:Request){return request.headers.get('Origin')||'';}
function originAllowed(origin:string){return !origin||allowedOrigins.includes(origin);}
function corsHeaders(request:Request){
  const origin=requestOrigin(request);
  return {
    ...(origin&&originAllowed(origin)?{'Access-Control-Allow-Origin':origin,'Vary':'Origin'}:{}),
    'Access-Control-Allow-Methods':'GET,OPTIONS',
    'Access-Control-Allow-Headers':'authorization, content-type, x-relayops-organization-id, x-relayops-station-id',
    'Access-Control-Max-Age':'600'
  };
}
function json(request:Request,body:unknown,status=200){
  return new Response(JSON.stringify(body),{status,headers:{...corsHeaders(request),'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
}
function uuid(value:string){return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);}

Deno.serve(async request=>{
  const origin=requestOrigin(request);
  if(!originAllowed(origin))return json(request,{error:'Origin not allowed'},403);
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:corsHeaders(request)});
  if(request.method!=='GET')return json(request,{error:'Method not allowed'},405);
  if(new URL(request.url).search)return json(request,{error:'Query parameters are not accepted'},400);
  if(request.body!==null)return json(request,{error:'Request bodies are not accepted'},400);

  const authorization=request.headers.get('Authorization')||'';
  const token=authorization.match(/^Bearer\s+(.+)$/i)?.[1]||'';
  if(!token)return json(request,{error:'Authenticated dispatcher session required'},401);

  const organizationId=String(request.headers.get('x-relayops-organization-id')||'').trim();
  const stationId=String(request.headers.get('x-relayops-station-id')||'').trim();
  if(!uuid(organizationId)||!uuid(stationId))return json(request,{error:'Valid RelayOps organization and station are required'},400);

  const supabaseUrl=Deno.env.get('SUPABASE_URL')||'';
  const anonKey=Deno.env.get('SUPABASE_ANON_KEY')||'';
  if(!supabaseUrl||!anonKey)return json(request,{error:'Fleet proxy authentication is not configured'},503);

  const caller=createClient(supabaseUrl,anonKey,{global:{headers:{Authorization:`Bearer ${token}`}},auth:{autoRefreshToken:false,persistSession:false}});
  const {data:{user},error:userError}=await caller.auth.getUser(token);
  if(userError||!user)return json(request,{error:'Dispatcher session is invalid or expired'},401);

  const [membershipResult,stationResult]=await Promise.all([
    caller.from('memberships').select('role,active').eq('organization_id',organizationId).eq('user_id',user.id).eq('active',true).maybeSingle(),
    caller.from('stations').select('id,organization_id').eq('id',stationId).eq('organization_id',organizationId).maybeSingle()
  ]);
  if(membershipResult.error||!membershipResult.data?.active)return json(request,{error:'Active RelayOps organization membership required'},403);
  if(stationResult.error||!stationResult.data)return json(request,{error:'RelayOps station access required'},403);

  const connectorUrlValue=Deno.env.get('FLEET_CONNECTOR_URL')||'';
  const connectorToken=Deno.env.get('FLEET_CONNECTOR_TOKEN')||'';
  if(!connectorUrlValue||!connectorToken)return json(request,{error:'Private Fleet connector is not configured'},503);

  let connectorUrl:URL;
  try {
    connectorUrl=new URL(connectorUrlValue);
    if(connectorUrl.protocol!=='https:')throw new Error('HTTPS required');
  } catch {
    return json(request,{error:'Private Fleet connector configuration is invalid'},503);
  }

  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),20000);
  try {
    const response=await fetch(connectorUrl.toString(),{
      method:'GET',
      headers:{Accept:'application/json',Authorization:`Bearer ${connectorToken}`},
      redirect:'error',
      signal:controller.signal
    });
    if(!response.ok)return json(request,{error:'Private Fleet connector could not complete the refresh'},502);
    const contentType=response.headers.get('content-type')||'';
    if(!contentType.toLowerCase().includes('application/json'))return json(request,{error:'Private Fleet connector returned an unsupported response'},502);
    const payload=await response.json();
    return json(request,payload,200);
  } catch(error) {
    const timedOut=error instanceof DOMException&&error.name==='AbortError';
    return json(request,{error:timedOut?'Private Fleet connector timed out':'Private Fleet connector is unavailable'},502);
  } finally {
    clearTimeout(timeout);
  }
});
