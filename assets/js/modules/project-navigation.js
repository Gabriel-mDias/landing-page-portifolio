export function initProjectNavigation() {
  const grid = document.getElementById('project-grid');
  const count = document.getElementById('project-count');
  const cards = [...(grid?.querySelectorAll('.project-card') || [])];
  if (!grid || !count || !cards.length) return;
  let active = 0;
  const update = () => { count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`; };
  const move = (delta) => {
    active = (active + delta + cards.length) % cards.length;
    const left = cards[active].offsetLeft - cards[0].offsetLeft;
    grid.scrollTo({ left, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    update();
  };
  document.querySelector('.project-prev')?.addEventListener('click', () => move(-1));
  document.querySelector('.project-next')?.addEventListener('click', () => move(1));
  update();
}
