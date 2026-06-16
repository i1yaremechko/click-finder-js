import { renderStatsPage } from "./pages/statsPage.js";

const homeView = document.getElementById('home-view');
const statsView = document.getElementById('stats-view');
const header = document.getElementById('app-header');
const footer = document.getElementById('app-footer');

const goToStatsBtn = document.getElementById('go-to-stats-btn');
const logoHome = document.getElementById('logo-to-home');
const breadcrumbHome = document.getElementById('breadcrumb-home');
const footerLogoHome = document.getElementById('footer-logo-to-home');

function switchToHome() {
  statsView.classList.add('hidden');
  homeView.classList.remove('hidden');

  header.classList.add('header_main');
  footer.classList.add('footer_main');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchToStats(page = 1) {
  homeView.classList.add('hidden');
  statsView.classList.remove('hidden');

  header.classList.remove('header_main');
  footer.classList.remove('footer_main');

  renderStatsPage(page);
  window.scrollTo({ top: 0 });
}

if (goToStatsBtn) {
  goToStatsBtn.addEventListener('click', () => {
    window.location.hash = '/users/stats?page=1&rowsPerPage=16';
  });
}

const homeButtons = [logoHome, breadcrumbHome, footerLogoHome];
homeButtons.forEach(btn => {
  if (btn) {
    btn.addEventListener('click', () => {
      window.location.hash = '/';
    });
  }
});

function initApp() {
  const hash = window.location.hash;

  if (hash.includes('users/stats')) {
    const searchPart = hash.split('?')[1];
    const urlParams = new URLSearchParams(searchPart);

    const pageParam = urlParams.get('page');
    const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;
    switchToStats(pageNumber);
  } else {
    switchToHome();
  }
}

window.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('hashchange', initApp);