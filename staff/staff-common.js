(function(){
'use strict';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function money(v){return new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(Number(v||0));}
function dt(v){return v?new Date(v).toLocaleString('en-GB',{dateStyle:'medium',timeStyle:'short'}):'—';}
function statusClass(s){return s==='Ready for Collection'?'status-ready':s==='Cancelled'?'status-cancelled':'';}
function nav(active){return `<div class="site-top-strip">Evan's Smart Fix • Staff Repair Desk</div><div class="staff-shell"><div class="staff-header"><div class="staff-brand"><img src="../images/logo.png" alt="Evan's Smart Fix"><div><h1>Evan's Smart Fix</h1><p>Staff Repair Desk • <span data-staff-name></span></p></div></div><nav class="staff-nav no-print"><a class="${active==='dashboard'?'active':''}" href="dashboard.html">Dashboard</a><a data-permission="create_tickets" class="${active==='new'?'active':''}" href="new-ticket.html">New Ticket</a><a data-permission="view_tickets" class="${active==='tickets'?'active':''}" href="tickets.html">Tickets</a><a data-permission="view_customers" class="${active==='customers'?'active':''}" href="customers.html">Customers</a><a data-admin-only class="${active==='staff'?'active':''}" href="staff-management.html">Staff</a><a data-admin-only class="${active==='audit'?'active':''}" href="audit.html">Audit</a><button id="staffLogout">Log Out</button></nav></div><main id="staffMain"></main></div>`;}
function mount(active){document.body.innerHTML=nav(active);document.getElementById('staffLogout').onclick=()=>ESFStaff.signOut();return document.getElementById('staffMain');}
async function db(){return ESFAuth.getClient();}
window.ESFUI={esc,money,dt,statusClass,mount,db};
})();
