import { getPageRange } from './utils/index.js';

export function renderPagination(currentPage, pagesCount) {
  const paginationContainer = document.getElementById('pagination-container');
  if (!paginationContainer) return;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;
  const { startPage, endPage } = getPageRange(currentPage, pagesCount);

  let paginationHTML = '';

  paginationHTML += `
    <button class="pagination__arrow" ${isFirstPage ? 'disabled' : ''} data-page="${currentPage - 1}">
      <img src="/images/arrow-left.svg" alt="Previous" class="pagination__icon" />
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
      <img src="/images/arrow-right.svg" alt="Next" class="pagination__icon" />
    </button>
  `;

  paginationContainer.innerHTML = paginationHTML;

  paginationContainer.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
      const targetPage = parseInt(e.currentTarget.getAttribute('data-page'), 10);
      if (isNaN(targetPage) || targetPage === currentPage) return;
      
      window.location.search = `?page=${targetPage}`;
    });
  });
}