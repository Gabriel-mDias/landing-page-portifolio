/** Entrada suave de elementos marcados, sem dependências externas. */
export function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;
  const showAll = () => elements.forEach((element) => element.classList.add('is-in'));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach((element) => observer.observe(element));
}
