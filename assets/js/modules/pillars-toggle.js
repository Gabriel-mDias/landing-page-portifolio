/**
 * Módulo dos Pilares de Gestão (Antes vs. Depois)
 * Permite ao usuário alternar entre os três pilares fundamentais:
 * Trabalho, Equipe e Financeiro.
 */

export function initPillarsToggle() {
  const buttons = Array.from(document.querySelectorAll('.pillar-btn'));
  const cards = Array.from(document.querySelectorAll('.pillar-card'));

  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-pillar');

      // Atualiza botões
      buttons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-selected', String(isActive));
      });

      // Atualiza cards
      cards.forEach((card) => {
        const matches = card.id === `pillar-${targetId}`;
        card.hidden = !matches;
        if (matches) {
          card.classList.add('reveal');
          requestAnimationFrame(() => card.classList.add('is-in'));
        }
      });
    });
  });
}
