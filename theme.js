/* ---------- LIGHT / DARK SWITCHER ---------- */
(function () {
  // 1. Apply saved or preferred theme
  const saved = localStorage.getItem('theme'); // "light" | "dark" | null
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const useDark = saved === 'dark' || (!saved && prefersDark);

  if (useDark) {
    document.body.classList.add('dark');
  }

  // 2. Find the toggle (may not exist on some pages yet)
  const btn = document.getElementById('themeToggle');
  if (!btn) return;            // nothing to set up, but theme is already applied

  // 3. Set initial label
  btn.textContent = useDark ? 'Light mode' : 'Dark mode';

  // 4. Handle clicks
  btn.addEventListener('click', () => {
    const darkNow = document.body.classList.toggle('dark');
    btn.textContent = darkNow ? 'Light mode' : 'Dark mode';
    localStorage.setItem('theme', darkNow ? 'dark' : 'light');
  });
})();
