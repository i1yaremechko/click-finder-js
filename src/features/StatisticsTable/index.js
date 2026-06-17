import { renderPagination } from '../Pagination/index.js';
import { StatisticsGateway } from './gateways/index.js';
import { combineUsersWithStats } from './utils/index.js';

export async function renderStatisticsTable(page = 1) {
  const tbody = document.getElementById('table-body');
  const loader = document.getElementById('global-loader');
  
  if (!tbody) return;
  if (loader) loader.classList.remove('hidden');

  try {
    const usersResponse = await StatisticsGateway.fetchUsers(page);
    let users = usersResponse?.data || [];
    const pagesCount = usersResponse?.pagesCount || 1;

    if (users.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="custom-table__empty">No users found</td></tr>`;
      return;
    }

    const userIds = users.map(u => u.id).join(',');
    const stats = await StatisticsGateway.fetchUsersStats(userIds);
    
    const finalData = combineUsersWithStats(users, stats);

    tbody.innerHTML = finalData.map(user => `
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
    `).join('');

    renderPagination(page, pagesCount);
  } catch (error) {
    console.error(error);
    tbody.innerHTML = `<tr><td colspan="8" class="custom-table__empty">Error loading data</td></tr>`;
  } finally {
    if (loader) loader.classList.add('hidden');
  }
}