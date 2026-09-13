/**
 * Entrypoint Principal da Aplicação (ES Module)
 * Orquestra a inicialização dos módulos desacoplados seguindo Clean Code.
 */

import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initShowcaseTabs } from './modules/showcase-tabs.js';
import { initPillarsToggle } from './modules/pillars-toggle.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initContactForm } from './modules/contact-form.js';

function bootstrap() {
  const config = window.GEMS_CONFIG || {};

  initTheme();
  initNavigation();
  initShowcaseTabs();
  initPillarsToggle();
  initScrollReveal();
  initContactForm(config);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
