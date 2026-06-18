import { renderStatisticsTable } from './features/StatisticsTable/index.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  renderStatisticsTable(currentPage, true);
});

window.addEventListener('popstate', (e) => {
  const page = e.state?.page || 1;
  renderStatisticsTable(page, false);
});