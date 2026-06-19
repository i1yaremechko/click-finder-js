import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from '@common/constants/index.js';
import { renderPagination } from '@features/Pagination/index.js';
import { StatisticsGateway } from './gateways/index.js';
import { combineUsersWithStats } from './utils/index.js';

const renderRows = (users, tbody) => {
  tbody.innerHTML = users.map(user => `
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
};

export const renderStatisticsTable = async (page = DEFAULT_PAGE, isFirstLoad = false) => {
  const tbody = document.getElementById('table-body');
  const loader = document.getElementById('global-loader');

  const urlParams = new URLSearchParams(window.location.search);
  const rowsPerPage = parseInt(urlParams.get('rowsPerPage'), 10) || DEFAULT_ROWS_PER_PAGE;
  
  if (loader) {
    loader.classList.remove('hidden');
  }

  try {
    const [usersResponse, stats] = await Promise.all([
      StatisticsGateway.fetchUsers(page, rowsPerPage),
      StatisticsGateway.fetchUsersStats(page, rowsPerPage)
    ]);
    
    const users = usersResponse?.data || [];
    const pagesCount = usersResponse?.pagesCount || 1;

    if (users.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="custom-table__empty">No users found</td></tr>`;
      return;
    }

    const finalData = combineUsersWithStats(users, stats);

    renderRows(finalData, tbody);

    renderPagination(page, pagesCount, (newPage) => {
      const newUrl = `${window.location.pathname}?page=${newPage}&rowsPerPage=${rowsPerPage}`;
      window.history.pushState({}, '', newUrl);
      renderStatisticsTable(newPage, false);
    });
  } catch (error) {
    console.error(error);
    tbody.innerHTML = `<tr><td colspan="8" class="custom-table__empty">Error loading data</td></tr>`;
  } finally {
    if (loader) loader.classList.add('hidden');
  }
};

export const initStatistics = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    const currentPage = pageParam ? parseInt(pageParam, 10) : DEFAULT_PAGE;

    renderStatisticsTable(currentPage, true);
  });

  window.addEventListener('popstate', (e) => {
    const page = e.state?.page || DEFAULT_PAGE;
    renderStatisticsTable(page, false);
  });
};