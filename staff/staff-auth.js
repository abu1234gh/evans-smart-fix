(function(){
'use strict';
const PERMS=['create_tickets','view_tickets','edit_tickets','view_customers','update_status','add_notes','record_payments','print_tickets','issue_refunds','manage_staff','view_audit','system_settings'];
async function getStaff(){
  const session=await window.ESFAuth.getSession();
  if(!session) return null;
  const db=await window.ESFAuth.getClient();
  const {data,error}=await db.from('staff_profiles').select('*').eq('user_id',session.user.id).eq('active',true).maybeSingle();
  if(error) throw error;
  return data?{...data,user:session.user}:null;
}
function has(staff,permission){return !!staff&&(staff.role==='admin'||staff.permissions?.[permission]===true);}
async function requireStaff(permission){
  try{
    const staff=await getStaff();
    if(!staff){location.replace('login.html');return null;}
    if(permission&&!has(staff,permission)){location.replace('dashboard.html?denied=1');return null;}
    window.ESFStaff.current=staff;
    document.querySelectorAll('[data-admin-only]').forEach(el=>el.classList.toggle('hidden',staff.role!=='admin'));
    document.querySelectorAll('[data-permission]').forEach(el=>el.classList.toggle('hidden',!has(staff,el.dataset.permission)));
    document.querySelectorAll('[data-staff-name]').forEach(el=>el.textContent=staff.display_name||staff.user.email);
    return staff;
  }catch(e){console.error(e);location.replace('login.html?error=staff');return null;}
}
async function signOut(){const db=await window.ESFAuth.getClient();await db.auth.signOut();location.replace('login.html');}
window.ESFStaff={PERMS,getStaff,has,requireStaff,signOut,current:null};
})();
