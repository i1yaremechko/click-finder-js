import { DEFAULT_PAGE } from '../../common/constants/index.js';
import { getPageRange } from './utils/index.js';

export function renderPagination(currentPage, pagesCount, onPageChange) {
  const paginationContainer = document.getElementById('pagination-container');
  if (!paginationContainer) return;

  const isFirstPage = currentPage === DEFAULT_PAGE;
  const isLastPage = currentPage === pagesCount;
  const { startPage, endPage } = getPageRange(currentPage, pagesCount);

  const baseUrl = import.meta.env.BASE_URL;

  let paginationHTML = '';

  paginationHTML += `
    <button class="pagination__arrow" ${isFirstPage ? 'disabled' : ''} data-page="${currentPage - 1}">
      <img src="${baseUrl}images/arrow-left.svg" alt="Previous" class="pagination__icon" />
    </button>
  `;

  if (startPage > 1) {
    paginationHTML += `<button class="pagination__page" data-page="1">1</button>`;
  }
  if (startPage > 2) {
    paginationHTML += `<span class="pagination__ellipsis">...</span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    const isActive = i === currentPage ? 'active' : '';
    paginationHTML += `<button class="pagination__page ${isActive}" data-page="${i}">${i}</button>`;
  }

  if (endPage < pagesCount - 1) {
    paginationHTML += `<span class="pagination__ellipsis">...</span>`;
  }
  if (endPage < pagesCount) {
    paginationHTML += `<button class="pagination__page" data-page="${pagesCount}">${pagesCount}</button>`;
  }

  paginationHTML += `
    <button class="pagination__arrow" ${isLastPage ? 'disabled' : ''} data-page="${currentPage + 1}">
      <img src="${baseUrl}images/arrow-right.svg" alt="Next" class="pagination__icon" />
    </button>
  `;

  paginationContainer.innerHTML = paginationHTML;

  paginationContainer.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
      const targetPage = parseInt(e.currentTarget.getAttribute('data-page'), 10);
      if (isNaN(targetPage) || targetPage === currentPage) return;

      const newUrl = `${window.location.pathname}?page=${targetPage}`;
      window.history.pushState({ page: targetPage }, '', newUrl);
      
      if (typeof onPageChange === 'function') {
        onPageChange(targetPage);
      }
    });
  });
}