export function initTheme() {
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = () => { try { return localStorage.getItem('gems-theme'); } catch { return null; } };
  if (!themeBtn) return;
  const saved = savedTheme();
  root.dataset.theme = saved === 'dark' || saved === 'light' ? saved : (media.matches ? 'dark' : 'light');
  const paint = () => {
    const dark = root.dataset.theme === 'dark';
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.setAttribute('aria-label', dark ? 'Mudar para tema claro' : 'Mudar para tema escuro');
    themeBtn.querySelector('span').textContent = dark ? '☼' : '◐';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0a0a0a' : '#f6f4ef');
  };
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('gems-theme', root.dataset.theme); } catch { /* armazenamento indisponível */ }
    paint();
  });
  media.addEventListener('change', () => {
    if (!savedTheme()) { root.dataset.theme = media.matches ? 'dark' : 'light'; paint(); }
  });
  paint();
}
