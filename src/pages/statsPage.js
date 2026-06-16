import { renderPagination } from '../components/pagination.js';
import { UsersService } from '../services/usersService.js';

export async function renderStatsPage(page = 1) {
  const tbody = document.getElementById('table-body');
  const loader = document.getElementById('global-loader');
  
  if (!tbody) return;
  if (loader) loader.classList.remove('hidden');
  
  const { users, pagesCount } = await UsersService.getFullUsersData(page);
  
  if (loader) loader.classList.add('hidden');
  if (!users || users.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="custom-table__empty">
          No users found
        </td>
      </tr>
    `;
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