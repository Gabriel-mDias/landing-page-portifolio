export function initHeroVideo() {
  const video = document.querySelector('.hero-video video');
  const source = video?.querySelector('source[data-src]');
  if (!video || !source) return;

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => {
    if (motion.matches) {
      video.pause();
      source.removeAttribute('src');
      video.load();
      return;
    }
    if (!source.hasAttribute('src')) {
      source.src = source.dataset.src;
      video.load();
    }
    video.play().catch(() => {});
  };

  update();
  motion.addEventListener?.('change', update);
}
