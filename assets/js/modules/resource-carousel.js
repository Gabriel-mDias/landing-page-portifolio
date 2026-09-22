export function initResourceCarousel(carousel = document.querySelector('[data-carousel]')) {
  if (!carousel) return null;
  const track = carousel.querySelector('[data-carousel-track]');
  const previous = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  const live = carousel.querySelector('[data-carousel-status]');
  const pagination = carousel.querySelector('[data-carousel-pagination]');
  if (!track || !previous || !next || !pagination) return null;

  let slides = [];
  let dots = [];
  let active = 0;
  let startX = null;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const visibleSlides = () => slides.filter((slide) => !slide.hidden);

  const update = (index, announce = true) => {
    const visible = visibleSlides();
    if (!visible.length) return;
    active = (index + visible.length) % visible.length;
    const target = visible[active];
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    dots.forEach((dot, dotIndex) => dot.setAttribute('aria-current', String(dotIndex === active)));
    if (announce && live) live.textContent = `${target.dataset.name}, perfil ${active + 1} de ${visible.length}`;
  };

  const rebuild = () => {
    slides = [...track.querySelectorAll('.rs-team-slide')];
    const visible = visibleSlides();
    pagination.replaceChildren();
    dots = visible.map((slide, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ver ${slide.dataset.name}`);
      dot.setAttribute('aria-current', String(index === 0));
      dot.addEventListener('click', () => update(index));
      pagination.append(dot);
      return dot;
    });
    active = 0;
    track.scrollLeft = 0;
    if (live) live.textContent = visible.length ? `${visible[0].dataset.name}, perfil 1 de ${visible.length}` : 'Nenhum profissional neste filtro';
  };

  previous.addEventListener('click', () => update(active - 1));
  next.addEventListener('click', () => update(active + 1));
  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); update(active - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); update(active + 1); }
    if (event.key === 'Home') { event.preventDefault(); update(0); }
    if (event.key === 'End') { event.preventDefault(); update(visibleSlides().length - 1); }
  });
  track.addEventListener('pointerdown', (event) => { startX = event.clientX; });
  track.addEventListener('pointerup', (event) => {
    if (startX !== null && Math.abs(event.clientX - startX) > 45) update(active + (event.clientX < startX ? 1 : -1));
    startX = null;
  });
  track.addEventListener('scroll', () => {
    const visible = visibleSlides();
    if (!visible.length) return;
    const closest = visible.reduce((best, slide, index) => {
      const distance = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity });
    active = closest.index;
    dots.forEach((dot, index) => dot.setAttribute('aria-current', String(index === active)));
  }, { passive: true });

  rebuild();
  return { rebuild, goTo: update };
}
