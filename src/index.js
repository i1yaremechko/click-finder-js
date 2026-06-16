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

function switchToStats() {
  homeView.classList.add('hidden');
  statsView.classList.remove('hidden');

  header.classList.remove('header_main');
  footer.classList.remove('footer_main');

  renderStatsPage(1);
  window.scrollTo({ top: 0 });
}

if (goToStatsBtn) goToStatsBtn.addEventListener('click', switchToStats);
if (logoHome) logoHome.addEventListener('click', switchToHome);
if (breadcrumbHome) breadcrumbHome.addEventListener('click', switchToHome);
if (footerLogoHome) footerLogoHome.addEventListener('click', switchToHome);