import { renderStatsPage } from '../pages/statsPage.js';

export const mainPageElement = document.querySelector('main');
const headerElement = document.querySelector('header');
const footerElement = document.querySelector('footer');
const homeHTML = mainPageElement ? mainPageElement.innerHTML : '';

const BASE_URL = window.location.hostname.includes('github.io') ? '/click-finder-js' : '';

export function handleRouting() {
  let path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);

  if (BASE_URL && path.startsWith(BASE_URL)) {
    path = path.replace(BASE_URL, '');
  }

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
  const fullUrl = (BASE_URL && !url.startsWith(BASE_URL)) ? BASE_URL + url : url;
  window.history.pushState(null, null, url);
  handleRouting();
}