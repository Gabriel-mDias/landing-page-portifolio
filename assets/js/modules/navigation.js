/**
 * Módulo de Navegação
 * Controla o cabeçalho flutuante (is-stuck ao rolar) e o menu hambúrguer para dispositivos móveis.
 */

export function initNavigation() {
  const topbar = document.getElementById('topbar');
  const navBtn = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');

  // Efeito sticky do cabeçalho
  if (topbar) {
    const markStuck = () => {
      topbar.classList.toggle('is-stuck', window.scrollY > 12);
    };
    window.addEventListener('scroll', markStuck, { passive: true });
    markStuck();
  }

  // Menu em telas menores
  if (navBtn && nav) {
    const closeNav = () => {
      nav.removeAttribute('data-open');
      navBtn.setAttribute('aria-expanded', 'false');
    };

    navBtn.addEventListener('click', () => {
      const isOpen = nav.getAttribute('data-open') === 'true';
      if (isOpen) {
        closeNav();
      } else {
        nav.setAttribute('data-open', 'true');
        navBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Fecha ao clicar em um link interno
    nav.addEventListener('click', (ev) => {
      if (ev.target.closest('a')) {
        closeNav();
      }
    });

    // Fecha com tecla ESC
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && nav.getAttribute('data-open') === 'true') {
        closeNav();
        navBtn.focus();
      }
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (ev) => {
      if (
        nav.getAttribute('data-open') === 'true' &&
        !nav.contains(ev.target) &&
        !navBtn.contains(ev.target)
      ) {
        closeNav();
      }
    });
  }
}
