/* ---------- LIGHT / DARK SWITCHER ---------- */

/* 1. helper to apply saved or preferred theme */
function applyInitialTheme() {
  const saved   = localStorage.getItem('theme');                   // "dark" | "light" | null
  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark    = saved === 'dark' || (!saved && prefers);
  document.body.classList.toggle('dark', dark);
  return dark;
}

/* 2. setup the button once it exists */
function initToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;                         // still not present
  btn.textContent = document.body.classList.contains('dark') ? 'Light mode' : 'Dark mode';
  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    btn.textContent = isDark ? 'Light mode' : 'Dark mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

/* 3. run immediately for body class */
applyInitialTheme();

/* 4. if header already injected, init now; otherwise wait for the custom event */
if (document.getElementById('themeToggle')) {
  initToggle();
} else {
  document.addEventListener('layoutReady', initToggle, { once: true });
}
