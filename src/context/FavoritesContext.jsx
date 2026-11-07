import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { readJSON, writeJSON } from "../utils/storage.js";

const STORAGE_KEY = "ph:favorites:v2";
const FavoritesContext = createContext(null);

// Keeps the favorites list for the whole app and remembers it in localStorage.
// Any component can read/change favorites with useFavorites() - no props needed.
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => readJSON(STORAGE_KEY, []));

  useEffect(() => {
    writeJSON(STORAGE_KEY, favorites);
  }, [favorites]);

  // add if missing, remove if already there
  const toggleFavorite = useCallback((item) => {
    setFavorites((previous) => {
      const exists = previous.some((f) => f.id === item.id && f.type === item.type);
      return exists
        ? previous.filter((f) => !(f.id === item.id && f.type === item.type))
        : [...previous, item];
    });
  }, []);

  const toggleWallpaper = useCallback(
    (wallpaper) =>
      toggleFavorite({
        id: wallpaper.id,
        type: "wallpaper",
        title: wallpaper.title,
        category: wallpaper.category,
        categoryId: wallpaper.categoryId,
        image: wallpaper.image,
      }),
    [toggleFavorite]
  );

  const toggleTheme = useCallback(
    (theme, categoryName, image = "") =>
      toggleFavorite({
        id: theme.id,
        type: "theme",
        title: theme.name,
        category: categoryName,
        categoryId: theme.categoryId,
        image,
        colors: theme.colors,
      }),
    [toggleFavorite]
  );

  const isFavorite = useCallback(
    (id, type) => favorites.some((f) => f.id === id && f.type === type),
    [favorites]
  );

  const value = useMemo(
    () => ({ favorites, toggleFavorite, toggleWallpaper, toggleTheme, isFavorite }),
    [favorites, toggleFavorite, toggleWallpaper, toggleTheme, isFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return context;
}
