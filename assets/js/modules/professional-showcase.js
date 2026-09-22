import { initResourceCarousel } from './resource-carousel.js';

const escapeHtml = (value = '') => String(value).replace(/[&<>"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
}[character]));

export async function initProfessionalShowcase() {
  const track = document.querySelector('[data-carousel-track]');
  const dialog = document.getElementById('professional-dialog');
  const dialogContent = dialog?.querySelector('[data-dialog-content]');
  if (!track || !dialog || !dialogContent) return;

  let professionals = [];
  let carousel = null;
  let opener = null;

  const closeDialog = () => dialog.close();
  const openProfessional = (id, trigger) => {
    const professional = professionals.find((item) => item.id === id);
    if (!professional) return;
    opener = trigger;
    dialogContent.innerHTML = `
      <article class="rs-profile">
        <div class="rs-profile__media">
          <img src="/assets/img/recursos/team/${encodeURIComponent(professional.image)}" alt="${escapeHtml(professional.displayName)}" width="720" height="900">
        </div>
        <div class="rs-profile__body">
          <div>
            <p class="rs-profile__kicker">Centro Odontomédico · Corpo clínico</p>
            <h2 id="professional-dialog-title">${escapeHtml(professional.name)}</h2>
            <p class="rs-profile__description">${escapeHtml(professional.description)}</p>
          </div>
          <div class="rs-profile__details">
            <h3>Especialidades &amp; atuação</h3>
            <ul>${professional.roles.map((role) => `<li>${escapeHtml(role)}</li>`).join('')}</ul>
          </div>
          <div class="rs-profile__footer"><a class="btn btn--solid" href="/#contato">Quero uma experiência assim <span aria-hidden="true">↗</span></a></div>
        </div>
      </article>`;
    document.documentElement.classList.add('is-dialog-open');
    document.body.classList.add('is-dialog-open');
    dialog.showModal();
    dialog.querySelector('[data-dialog-close]')?.focus();
  };

  try {
    const response = await fetch('/assets/data/professionals.json');
    if (!response.ok) throw new Error('Catálogo indisponível');
    const data = await response.json();
    professionals = Array.isArray(data.professionals) ? data.professionals : [];
    track.innerHTML = professionals.map((professional, index) => `
      <div class="rs-team-slide" data-name="${escapeHtml(professional.displayName)}" data-tags="${escapeHtml(professional.tags.join(' '))}">
        <button class="rs-team-card" type="button" data-professional="${escapeHtml(professional.id)}" aria-haspopup="dialog">
          <span class="rs-team-card__media"><img src="/assets/img/recursos/team/${encodeURIComponent(professional.image)}" alt="" width="720" height="900" loading="lazy"><span class="rs-team-card__view" aria-hidden="true">⌁</span></span>
          <span class="rs-team-card__body"><span class="rs-team-card__index">${String(index + 1).padStart(2, '0')}</span><span class="rs-team-card__name">${escapeHtml(professional.displayName)}</span><span class="rs-team-card__role">${escapeHtml(professional.roles[0])}</span></span>
        </button>
      </div>`).join('');
    track.setAttribute('aria-busy', 'false');

    track.querySelectorAll('[data-professional]').forEach((button) => {
      button.addEventListener('click', () => openProfessional(button.dataset.professional, button));
    });
    carousel = initResourceCarousel(track.closest('[data-carousel]'));

    document.querySelectorAll('[data-team-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.teamFilter;
        document.querySelectorAll('[data-team-filter]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        track.querySelectorAll('.rs-team-slide').forEach((slide) => {
          slide.hidden = filter !== 'all' && !slide.dataset.tags.split(' ').includes(filter);
        });
        carousel?.rebuild();
      });
    });
  } catch {
    track.setAttribute('aria-busy', 'false');
    track.innerHTML = '<p class="rs-carousel__empty">Não foi possível carregar o corpo clínico agora.</p>';
  }

  dialog.querySelector('[data-dialog-close]')?.addEventListener('click', closeDialog);
  dialog.addEventListener('click', (event) => { if (event.target === dialog) closeDialog(); });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('is-dialog-open');
    document.body.classList.remove('is-dialog-open');
    dialogContent.replaceChildren();
    opener?.focus();
  });
}
