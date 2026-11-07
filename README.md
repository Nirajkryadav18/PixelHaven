# PixelHaven - Wallpapers & Themes

React + Vite website. Wallpapers come live from the [Pexels API](https://www.pexels.com/api/).

## Run it

```bash
npm install
cp .env.example .env      # then paste your Pexels key inside .env
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).
After changing `.env` always restart `npm run dev`.

## Folder guide

```
src/
  context/     shared data for the whole app (useContext)
    WallpaperContext.jsx   API feeds, cover photos, search text
    FavoritesContext.jsx   favorites (saved in localStorage)
    ThemeContext.jsx       active theme (changes CSS colours)
    AppProviders.jsx       wraps all contexts together
  services/pexels.js       the ONLY file that talks to the API
  hooks/                   useFeed, useWallpaper, useCovers, useCategoryParam, useDebounce
  data/
    categories.js          categories + their Pexels search words
    themes.js              theme colour palettes
  components/              Navbar, Footer, WallpaperCard, ThemeCard, CategoryCard, CategoryFilter ...
  pages/                   Home, Wallpapers, WallpaperDetails, Themes, Categories, Favorites
```

## Common changes

- **New category:** add one object in `src/data/categories.js` (id, name, colors, queries).
- **New theme:** add one object in `src/data/themes.js`.
- **More / different photos:** change the `queries` of a category.
- Free Pexels limit is 200 requests/hour. Answers are cached, so normal use stays well below it.
