export function initComparison() {
  document.querySelectorAll('[data-comparison]').forEach((comparison) => {
    const slider = comparison.querySelector('[role="slider"]');
    const before = comparison.querySelector('[data-comparison-before]');
    const after = comparison.querySelector('[data-comparison-after]');
    const tabs = [...document.querySelectorAll('[data-comparison-tabs] [role="tab"]')];
    if (!slider || !before || !after) return;
    tabs.forEach((tab) => { tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1; });

    const setValue = (value) => {
      const next = Math.max(0, Math.min(100, Math.round(value)));
      comparison.style.setProperty('--comparison-position', `${next}%`);
      slider.setAttribute('aria-valuenow', String(next));
      slider.setAttribute('aria-valuetext', `${next} por cento da imagem anterior visível`);
    };

    const setFromPointer = (event) => {
      const bounds = comparison.getBoundingClientRect();
      setValue(((event.clientX - bounds.left) / bounds.width) * 100);
    };

    const selectTab = (tab, focus = false) => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      before.src = tab.dataset.beforeSrc;
      before.alt = tab.dataset.beforeAlt;
      after.src = tab.dataset.afterSrc;
      after.alt = tab.dataset.afterAlt;
      comparison.classList.toggle('rs-comparison--portrait', tab.dataset.aspect === 'portrait');
      setValue(50);
      if (focus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(tab));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        selectTab(tabs[next], true);
      });
    });

    slider.addEventListener('keydown', (event) => {
      const value = Number(slider.getAttribute('aria-valuenow'));
      const moves = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 };
      if (event.key in moves) { event.preventDefault(); setValue(value + moves[event.key]); }
      if (event.key === 'Home') { event.preventDefault(); setValue(0); }
      if (event.key === 'End') { event.preventDefault(); setValue(100); }
    });

    comparison.addEventListener('pointerdown', (event) => {
      setFromPointer(event);
      comparison.setPointerCapture(event.pointerId);
    });
    comparison.addEventListener('pointermove', (event) => {
      if (comparison.hasPointerCapture(event.pointerId)) setFromPointer(event);
    });
  });
}
