import { navigateTo } from '../router/router.js';

export function renderPagination(currentPage, pagesCount) {
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