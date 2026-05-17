import type { ThemeConfig } from '../types/config.types';

export const themeConfig: ThemeConfig = {
  templateName: import.meta.env.VITE_TEMPLATE_NAME || 'Ecommerce App',
  logoUrl: import.meta.env.VITE_LOGO_URL || '/shopping-cart.svg',
  defaultMode: 'light',
};

export default themeConfig;
