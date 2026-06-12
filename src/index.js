import { handleRouting, navigateTo } from './router/router.js';

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