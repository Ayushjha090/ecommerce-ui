export interface ThemeConfig {
  templateName: string;
  logoUrl: string;
  defaultMode: 'light' | 'dark';
}

export interface AppConfig {
  apiUrl: string;
  defaultPageSize: number;
  apiTimeoutMs: number;
  reactQueryStaleTimeMs: number;
}
