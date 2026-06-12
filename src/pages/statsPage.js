import { renderPagination } from '../components/pagination.js';
import { mainPageElement, navigateTo } from '../router/router.js';
import { UsersService } from '../services/usersService.js';

export async function renderStatsPage(page = 1) {
  if (!mainPageElement) return;

  mainPageElement.innerHTML = `
    <div id="global-loader" class="linear-progress">
      <div class="linear-progress__bar"></div>
    </div>  
  
    <section class="statistic">
      <div class="wrapper wrapper_stat">
        <div class="statistic__breadcrumbs">
          <ul class="statistic__breadcrumbs-list">
            <li class="statistic__breadcrumbs-item">
              <a href="/" class="statistic__link statistic__link_back" data-link="/">Main page</a>
            </li>
            <li class="statistic__breadcrumbs-separator">&gt;</li>
            <li class="statistic__breadcrumbs-item">
              <span class="statistic__link">User statistics</span>
            </li>
          </ul>
        </div>
        
        <h2 class="statistic__title">Users statistics</h2>
        
        <div class="table-container" style="width: 100%;">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>IP address</th>
                <th>Total clicks</th>
                <th>Total page views</th>
              </tr>
            </thead>
            <tbody id="table-body">
              <tr>
                <td colspan="8" style="text-align: center; padding: 40px; background: #fff;">
                  Loading data...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div id="pagination-container" class="pagination"></div>
      </div>
    </section>
  `;

  const mainBreadcrumb = mainPageElement.querySelector('[data-link="/"]');
  if (mainBreadcrumb) {
    mainBreadcrumb.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('/');
    });
  }

  const { users, pagesCount } = await UsersService.getFullUsersData(page);

  const loader = document.getElementById('global-loader');
  if (loader) {
    loader.remove();
  }
  
  const tbody = document.getElementById('table-body');
  if (!tbody) return;

  if (users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 20px;">No users found</td></tr>`;
    return;
  }

  let rowsHTML = '';
  users.forEach(user => {
    rowsHTML += `
      <tr>
        <td>${user.id}</td>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td>${user.gender}</td>
        <td>${user.ip_address || '-'}</td>
        <td>${user.totalClicks}</td>
        <td>${user.totalPageViews}</td>
      </tr>
    `;
  });

  tbody.innerHTML = rowsHTML;
  renderPagination(page, pagesCount);
}