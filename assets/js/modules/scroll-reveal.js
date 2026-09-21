/**
 * Módulo de Revelação e Scroll Cinematográfico
 * Utiliza Lenis para Smooth Scroll e GSAP/ScrollTrigger para animações.
 */

export function initScrollReveal() {
  if (typeof window.Lenis === 'undefined' || typeof window.gsap === 'undefined') return;

  // 1. Inicializa Lenis Smooth Scroll
  const lenis = new window.Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 2. Integração do GSAP com Lenis
  window.gsap.registerPlugin(window.ScrollTrigger);
  
  // Opcional: Atualizar ScrollTrigger quando Lenis scrollar
  lenis.on('scroll', window.ScrollTrigger.update);
  
  window.gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
  });
  window.gsap.ticker.lagSmoothing(0);

  // 3. Configuração de Animações
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Apenas marca como visível
    document.querySelectorAll('.reveal').forEach((el) => {
      window.gsap.set(el, { opacity: 1, y: 0 });
      el.classList.add('is-in');
    });
    return;
  }

  // Anima elementos com a classe .reveal
  document.querySelectorAll('.reveal').forEach((el) => {
    // Configura o estado inicial
    window.gsap.set(el, { opacity: 0, y: 40 });

    window.gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });
}
