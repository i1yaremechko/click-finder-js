import { DEFAULT_PAGE } from '@common/constants/index.js';
import { getPageRange } from './utils/index.js';

const ELLIPSIS_HTML = `<span class="pagination__ellipsis">...</span>`;

const renderArrow = (targetPage, isDisabled, iconName, altText) => {
  const baseUrl = import.meta.env.BASE_URL;
  return `
    <button class="pagination__arrow" ${isDisabled ? 'disabled' : ''} data-page="${targetPage}">
      <img src="${baseUrl}images/${iconName}.svg" alt="${altText}" class="pagination__icon" />
    </button>
  `;
};

export const renderPagination = (currentPage, pagesCount, onPageChange) => {
  const paginationContainer = document.getElementById('pagination-container');
  if (!paginationContainer) return;

  const isFirstPage = currentPage === DEFAULT_PAGE;
  const isLastPage = currentPage === pagesCount;
  const { startPage, endPage } = getPageRange(currentPage, pagesCount);

  let paginationHTML = '';

  paginationHTML += renderArrow(currentPage - 1, isFirstPage, 'arrow-left', 'Previous');

  if (startPage > DEFAULT_PAGE) {
    paginationHTML += `<button class="pagination__page" data-page="${DEFAULT_PAGE}">${DEFAULT_PAGE}</button>`;
  }
  if (startPage > DEFAULT_PAGE + 1) {
    paginationHTML += ELLIPSIS_HTML;
  }

  for (let i = startPage; i <= endPage; i++) {
    const isActive = i === currentPage ? 'active' : '';
    paginationHTML += `<button class="pagination__page ${isActive}" data-page="${i}">${i}</button>`;
  }

  if (endPage < pagesCount - 1) {
    paginationHTML += ELLIPSIS_HTML;
  }
  if (endPage < pagesCount) {
    paginationHTML += `<button class="pagination__page" data-page="${pagesCount}">${pagesCount}</button>`;
  }

  paginationHTML += renderArrow(currentPage + 1, isLastPage, 'arrow-right', 'Next');

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
};