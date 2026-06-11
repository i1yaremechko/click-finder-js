
const API_URL = 'https://appco-snowy.vercel.app/api';

const mainPageElement = document.querySelector('main');
const headerElement = document.querySelector('header');
const footerElement = document.querySelector('footer');

const homeHTML = mainPageElement ? mainPageElement.innerHTML : '';

const UsersService = {
  async getUsers(page = 1, limit = 16) {
    try {
      const response = await fetch(`${API_URL}/users?page=${page}&rowsPerPage=${limit}`);
      if (!response.ok) throw new Error('Помилка при завантаженні користувачів');
      return await response.json(); 
    } catch (error) {
      console.error('UsersService.getUsers error:', error);
      return null;
    }
  },

  async getUsersStats(userIds) {
    try {
      const response = await fetch(`${API_URL}/users/statistics?userIds=${userIds}`);
      if (!response.ok) throw new Error('Помилка при завантаженні статистики');
      return await response.json();
    } catch (error) {
      console.error('UsersService.getUsersStats error:', error);
      return [];
    }
  },

  async getFullUsersData(page = 1) {
    const usersResponse = await this.getUsers(page);
    let users = [];
    let pagesCount = 1;
    
    if (usersResponse && usersResponse.data) {
      users = usersResponse.data;
      pagesCount = usersResponse.pagesCount || 1;
    }
    
    if (users.length === 0) return { users: [], pagesCount };

    const userIds = users.map(user => user.id).join(',');
    const stats = await this.getUsersStats(userIds);

    const combinedData = users.map(user => {
      const userDays = stats.filter(stat => stat.user_id === user.id);
      const totalClicks = userDays.reduce((sum, day) => sum + (day.clicks || 0), 0);
      const totalPageViews = userDays.reduce((sum, day) => sum + (day.page_views || 0), 0);
      
      return { ...user, totalClicks, totalPageViews };
    });

    return { users: combinedData, pagesCount };
  }
};

function renderPagination(currentPage, pagesCount) {
  const paginationContainer = document.getElementById('pagination-container');
  if (!paginationContainer) return;

  let paginationHTML = '';

  const isFirstPage = currentPage === 1;
  paginationHTML += `
    <button class="pagination__arrow" ${isFirstPage ? 'disabled' : ''} data-page="${currentPage - 1}">
      &lt;
    </button>
  `;

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(pagesCount, currentPage + 2);

  if (startPage > 1) {
    paginationHTML += `<button class="pagination__page" data-page="1">1</button>`;
    if (startPage > 2) paginationHTML += `<span class="pagination__ellipsis">...</span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <button class="pagination__page ${i === currentPage ? 'active' : ''}" data-page="${i}">
        ${i}
      </button>
    `;
  }

  if (endPage < pagesCount) {
    if (endPage < pagesCount - 1) paginationHTML += `<span class="pagination__ellipsis">...</span>`;
    paginationHTML += `<button class="pagination__page" data-page="${pagesCount}">${pagesCount}</button>`;
  }
  const isLastPage = currentPage === pagesCount;
  paginationHTML += `
    <button class="pagination__arrow" ${isLastPage ? 'disabled' : ''} data-page="${currentPage + 1}">
      &gt;
    </button>
  `;

  paginationContainer.innerHTML = paginationHTML;

  paginationContainer.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
      const targetPage = parseInt(e.currentTarget.getAttribute('data-page'));
      if (!isNaN(targetPage)) {
        navigateTo(`/users/stats?page=${targetPage}`);
      }
    });
  });
}

async function renderStatsPage(page = 1) {
  if (!mainPageElement) return;

  mainPageElement.innerHTML = `
    <section class="statistic">
      <div class="wrapper wrapper_stat">
        <div class="statistic__breadcrumbs">
          <ul class="statistic__breadcrumbs-list">
            <li class="statistic__breadcrumbs-item">
              <a href="/" class="statistic__link" data-link="/">Main page</a>
            </li>
            <li class="statistic__breadcrumbs-separator">&gt;</li>
            <li class="statistic__breadcrumbs-item">
              <span class="statistic__link statistic__link_back">User statistics</span>
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

function handleRouting() {
  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);

  if (path === '/users/stats') {
    if (headerElement) headerElement.classList.remove('header_main');
    if (footerElement) footerElement.classList.remove('footer_main');

    const currentPage = parseInt(searchParams.get('page')) || 1;
    renderStatsPage(currentPage);
  } else {
    if (headerElement) headerElement.classList.add('header_main');
    if (footerElement) footerElement.classList.add('footer_main');

    if (mainPageElement) {
      mainPageElement.innerHTML = homeHTML;
    }
  }
}

function navigateTo(url) {
  window.history.pushState(null, null, url);
  handleRouting();
}

document.body.addEventListener('click', (e) => {
  const target = e.target.closest('[data-link]');
  if (target) {
    e.preventDefault();
    const url = target.getAttribute('data-link');
    navigateTo(url);
  }
});

window.addEventListener('popstate', handleRouting);
window.addEventListener('DOMContentLoaded', handleRouting);