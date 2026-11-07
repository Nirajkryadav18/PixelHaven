// A "feed" is one list of wallpapers (e.g. category "cars" + search "red").
// The key identifies that list inside the WallpaperContext.
export const makeFeedKey = (categoryId = "all", term = "") =>
  `${categoryId}::${term.trim().toLowerCase()}`;
