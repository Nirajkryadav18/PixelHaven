import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";
import { DEFAULT_THEME_ID, THEME_MAP } from "../data/themes.js";
import { readJSON, writeJSON } from "../utils/storage.js";

const STORAGE_KEY = "ph:theme:v1";
const ThemeContext = createContext(null);

// theme colour name -> CSS variable used in index.css
const CSS_VARIABLES = {
  bg: "--bg-color",
  surface: "--surface-color",
  text: "--text-color",
  muted: "--text-muted",
  accent: "--accent-color",
  accentText: "--accent-text",
  border: "--border-color",
};

// Remembers which theme is active and paints its colours on the whole page.
export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => readJSON(STORAGE_KEY, DEFAULT_THEME_ID));
  const activeTheme = THEME_MAP[themeId] || THEME_MAP[DEFAULT_THEME_ID];

  // runs before the browser paints, so there is no colour flash on reload
  useLayoutEffect(() => {
    const root = document.documentElement;
    Object.entries(CSS_VARIABLES).forEach(([name, cssVar]) => {
      root.style.setProperty(cssVar, activeTheme.colors[name]);
    });
    root.style.colorScheme = activeTheme.mode === "light" ? "light" : "dark";
    writeJSON(STORAGE_KEY, activeTheme.id);
  }, [activeTheme]);

  const applyTheme = useCallback((id) => setThemeId(id), []);
  const resetTheme = useCallback(() => setThemeId(DEFAULT_THEME_ID), []);

  const value = useMemo(
    () => ({ activeTheme, applyTheme, resetTheme }),
    [activeTheme, applyTheme, resetTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useSiteTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useSiteTheme must be used inside <ThemeProvider>");
  return context;
}
