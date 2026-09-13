/**
 * Módulo de Tematização (Tema Claro / Escuro)
 * Gerencia a alternância de tema com persistência em localStorage e sincronização
 * com as preferências do sistema operacional (prefers-color-scheme).
 */

export function initTheme() {
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');

  function getCurrentTheme() {
    const explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    return colorSchemeMedia.matches ? 'dark' : 'light';
  }

  function paintToggle() {
    const isDark = getCurrentTheme() === 'dark';
    themeBtn.setAttribute('aria-pressed', String(isDark));
    const label = themeBtn.querySelector('.iconbtn__label');
    if (label) {
      label.textContent = isDark ? 'Voltar ao tema claro' : 'Usar tema escuro';
    }
  }

  themeBtn.addEventListener('click', () => {
    const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('gems-theme', next);
    } catch (e) {
      // Ignora erro de cota ou navegação privada restrita
    }
    paintToggle();
  });

  colorSchemeMedia.addEventListener('change', paintToggle);
  paintToggle();
}
