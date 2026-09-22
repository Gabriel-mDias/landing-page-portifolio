import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initContactForm } from './modules/contact-form.js';
import { initAudienceDialog } from './modules/audience-dialog.js';
import { initProjectNavigation } from './modules/project-navigation.js';
import { initHeroVideo } from './modules/hero-video.js';

function bootstrap() {
  initTheme();
  initNavigation();
  initScrollReveal();
  initContactForm(window.GEMS_CONFIG || {});
  initAudienceDialog();
  initProjectNavigation();
  initHeroVideo();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootstrap);
else bootstrap();
document.documentElement.classList.add('js-enabled');
