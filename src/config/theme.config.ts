import type { ThemeConfig } from '../types/config.types';

import { env } from "./env.config";

export const themeConfig: ThemeConfig = {
  templateName: env.TEMPLATE_NAME,
  logoUrl: env.LOGO_URL,
  defaultMode: "light",
};

export default themeConfig;
