// inject-layout.js
async function loadFragment(targetId, file) {
  try {
    const res  = await fetch(file);      // fetch header.html / footer.html
    const html = await res.text();
    document.getElementById(targetId).innerHTML = html;
  } catch (err) {
    console.error(`Failed to load ${file}:`, err);
  }
}
Promise.all([
  loadFragment('site-header', 'header.html'),
  loadFragment('site-footer', 'footer.html')
]).then(() => {
  /* notify the rest of the page */
  document.dispatchEvent(new Event('layoutReady'));
}).catch(err => console.error('Fragment load failed:', err));

document.addEventListener('DOMContentLoaded', () => {
  loadFragment('site-header', 'header.html');
  loadFragment('site-footer', 'footer.html');
});
