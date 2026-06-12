import { renderStatsPage } from '../pages/statsPage.js';

export const mainPageElement = document.querySelector('main');
const headerElement = document.querySelector('header');
const footerElement = document.querySelector('footer');
const homeHTML = mainPageElement ? mainPageElement.innerHTML : '';

export function handleRouting() {
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

export function navigateTo(url) {
  window.history.pushState(null, null, url);
  handleRouting();
}