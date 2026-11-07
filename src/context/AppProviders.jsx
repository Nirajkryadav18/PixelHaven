import { ThemeProvider } from "./ThemeContext.jsx";
import { FavoritesProvider } from "./FavoritesContext.jsx";
import { WallpaperProvider } from "./WallpaperContext.jsx";

// One wrapper so main.jsx stays clean. Add new contexts here.
function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <WallpaperProvider>{children}</WallpaperProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
