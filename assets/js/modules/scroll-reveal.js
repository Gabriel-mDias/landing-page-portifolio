/**
 * Módulo de Revelação Suave (Scroll Reveal)
 * Utiliza IntersectionObserver para animar a entrada de elementos da página
 * respeitando as preferências de redução de movimento do usuário.
 */

export function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!window.IntersectionObserver || prefersReducedMotion) {
    elements.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    }
  );

  elements.forEach((el) => observer.observe(el));
}
