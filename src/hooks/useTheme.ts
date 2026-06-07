import { useEffect, useState } from "react";

import { themeConfig } from "@/config";

type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "theme_mode";

const getPreferredTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return themeConfig.defaultMode;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return themeConfig.defaultMode;
};

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(getPreferredTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  };

  return {
    isDarkMode: theme === "dark",
    setTheme,
    theme,
    toggleTheme,
  };
};
