/**
 * Módulo da Vitrine Interativa (Showcase Tabs)
 * Gerencia a alternância acessível entre exemplos de negócios no Hero,
 * com suporte completo a teclado e atributos WAI-ARIA.
 */

export function initShowcaseTabs() {
  const tabs = Array.from(document.querySelectorAll('.showcase__tabs [role="tab"]'));
  if (!tabs.length) return;

  function selectTab(tab, moveFocus = false) {
    tabs.forEach((other) => {
      const isSelected = other === tab;
      other.setAttribute('aria-selected', String(isSelected));
      other.tabIndex = isSelected ? 0 : -1;

      const panelId = other.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.hidden = !isSelected;
      }
    });

    if (moveFocus) {
      tab.focus();
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab, false));

    tab.addEventListener('keydown', (ev) => {
      let targetTab = null;

      if (ev.key === 'ArrowRight') {
        targetTab = tabs[(index + 1) % tabs.length];
      } else if (ev.key === 'ArrowLeft') {
        targetTab = tabs[(index - 1 + tabs.length) % tabs.length];
      } else if (ev.key === 'Home') {
        targetTab = tabs[0];
      } else if (ev.key === 'End') {
        targetTab = tabs[tabs.length - 1];
      }

      if (targetTab) {
        ev.preventDefault();
        selectTab(targetTab, true);
      }
    });
  });
}
