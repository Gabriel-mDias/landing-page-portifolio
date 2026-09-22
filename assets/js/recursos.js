import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initComparison } from './modules/comparison.js';
import { initProfessionalShowcase } from './modules/professional-showcase.js';

document.documentElement.classList.add('js-enabled');

function bootstrap() {
  initTheme();
  initNavigation();
  initComparison();
  initProfessionalShowcase();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootstrap);
else bootstrap();
