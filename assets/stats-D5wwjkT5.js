import"./index-QiOxLdu8.js";function _(t,a){return t<=4?{startPage:1,endPage:5}:t>=a-3?{startPage:a-4,endPage:a}:{startPage:t-1,endPage:t+1}}function $(t,a,e){const i=document.getElementById("pagination-container");if(!i)return;const s=t===1,d=t===a,{startPage:o,endPage:c}=_(t,a),g="/click-finder-js/";let r="";r+=`
    <button class="pagination__arrow" ${s?"disabled":""} data-page="${t-1}">
      <img src="${g}images/arrow-left.svg" alt="Previous" class="pagination__icon" />
    </button>
  `,o>1&&(r+='<button class="pagination__page" data-page="1">1</button>'),o>2&&(r+='<span class="pagination__ellipsis">...</span>');for(let n=o;n<=c;n++)r+=`<button class="pagination__page ${n===t?"active":""}" data-page="${n}">${n}</button>`;c<a-1&&(r+='<span class="pagination__ellipsis">...</span>'),c<a&&(r+=`<button class="pagination__page" data-page="${a}">${a}</button>`),r+=`
    <button class="pagination__arrow" ${d?"disabled":""} data-page="${t+1}">
      <img src="${g}images/arrow-right.svg" alt="Next" class="pagination__icon" />
    </button>
  `,i.innerHTML=r,i.querySelectorAll("button").forEach(n=>{n.addEventListener("click",f=>{const l=parseInt(f.currentTarget.getAttribute("data-page"),10);if(isNaN(l)||l===t)return;const w=`${window.location.pathname}?page=${l}`;window.history.pushState({page:l},"",w),typeof e=="function"&&e(l)})})}const m="https://appco-snowy.vercel.app/api",u={async fetchUsers(t=1,a=16){const e=await fetch(`${m}/users?page=${t}&rowsPerPage=${a}`);if(!e.ok)throw new Error("Error loading users");return e.json()},async fetchUsersStats(t){const a=await fetch(`${m}/users/statistics?userIds=${t}`);if(!a.ok)throw new Error("Error loading statistics");return a.json()}};function b(t,a){return t.map(e=>{const i=a.filter(o=>o.user_id===e.id),s=i.reduce((o,c)=>o+(c.clicks||0),0),d=i.reduce((o,c)=>o+(c.page_views||0),0);return{...e,totalClicks:s,totalPageViews:d}})}async function p(t=1,a=!1){const e=document.getElementById("table-body"),i=document.getElementById("global-loader");if(e){a&&i&&(i.classList.remove("hidden"),e.innerHTML="");try{const s=await u.fetchUsers(t);let d=(s==null?void 0:s.data)||[];const o=(s==null?void 0:s.pagesCount)||1;if(d.length===0){e.innerHTML='<tr><td colspan="8" class="custom-table__empty">No users found</td></tr>';return}const c=d.map(n=>n.id).join(","),g=await u.fetchUsersStats(c),r=b(d,g);e.innerHTML=r.map(n=>`
      <tr>
        <td>${n.id}</td>
        <td>${n.first_name}</td>
        <td>${n.last_name}</td>
        <td>${n.email}</td>
        <td>${n.gender}</td>
        <td>${n.ip_address||"-"}</td>
        <td>${n.totalClicks}</td>
        <td>${n.totalPageViews}</td>
      </tr>
    `).join(""),$(t,o,n=>{p(n,!1)})}catch(s){console.error(s),e.innerHTML='<tr><td colspan="8" class="custom-table__empty">Error loading data</td></tr>'}finally{i&&i.classList.add("hidden")}}}document.addEventListener("DOMContentLoaded",()=>{const a=new URLSearchParams(window.location.search).get("page"),e=a?parseInt(a,10):1;p(e,!0)});window.addEventListener("popstate",t=>{var e;const a=((e=t.state)==null?void 0:e.page)||1;p(a,!1)});
