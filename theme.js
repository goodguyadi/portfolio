/* ---------- LIGHT / DARK SWITCHER (final) ---------- */

/* 1. Set the initial body class once */
(function () {
  const saved   = localStorage.getItem('theme');                  // "dark" | "light" | null
  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const startDark = saved === 'dark' || (!saved && prefers);
  document.body.classList.toggle('dark', startDark);
})();

/* 2. Initialise the button when the header is injected */
document.addEventListener('layoutReady', initToggle, { once: true });

function initToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  // set correct label
  btn.textContent = document.body.classList.contains('dark') ? 'Light mode' : 'Dark mode';

  document.addEventListener('click', (e) => {
  // is the thing we clicked (or one of its parents) the toggle?
  const btn = e.target.closest('#themeToggle');
  if (!btn) return;                    // click wasn’t on the toggle

  const darkNow = document.body.classList.toggle('dark');
  btn.textContent = darkNow ? 'Light mode' : 'Dark mode';
  localStorage.setItem('theme', darkNow ? 'dark' : 'light');
});
}
