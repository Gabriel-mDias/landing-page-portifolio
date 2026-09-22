export function initAudienceDialog() {
  const dialog = document.getElementById('audience-dialog');
  const content = document.getElementById('dialog-content');
  if (!dialog || !content || typeof dialog.showModal !== 'function') return;
  let opener = null;
  const titles = { saude: 'Para você, profissional da saúde', estetica: 'Para sua clínica de estética', multidisciplinar: 'Para sua clínica multidisciplinar' };

  function setSize(size) {
    content.querySelector('.mini-site')?.classList.toggle('is-mobile', size === 'mobile');
    dialog.querySelectorAll('[data-preview-size]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.previewSize === size)));
  }

  document.querySelectorAll('[data-audience]').forEach((button) => button.addEventListener('click', () => {
    const template = document.getElementById(`template-${button.dataset.audience}`);
    if (!template) return;
    opener = button;
    content.replaceChildren(template.content.cloneNode(true));
    dialog.querySelector('#dialog-title')?.remove();
    const heading = document.createElement('h1');
    heading.id = 'dialog-title';
    heading.className = 'visually-hidden';
    heading.textContent = titles[button.dataset.audience];
    content.prepend(heading);
    content.querySelectorAll('[data-specialty-filter]').forEach((filter) => filter.addEventListener('click', () => {
      const selected = filter.dataset.specialtyFilter;
      content.querySelectorAll('[data-specialty-filter]').forEach((button) => button.setAttribute('aria-pressed', String(button === filter)));
      content.querySelectorAll('[data-specialty]').forEach((item) => {
        item.hidden = selected !== 'all' && item.dataset.specialty !== selected;
      });
    }));
    setSize('mobile');
    dialog.showModal();
    dialog.querySelector('.dialog-close').focus();
  }));

  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.querySelectorAll('[data-preview-size]').forEach((button) => button.addEventListener('click', () => setSize(button.dataset.previewSize)));
  dialog.addEventListener('click', (event) => {
    const preview = content.querySelector('.mini-site');
    if (event.target === dialog || (event.target === content && preview && !preview.contains(event.target))) dialog.close();
  });
  dialog.addEventListener('close', () => { content.replaceChildren(); opener?.focus(); });
}
