import { useEffect } from "react";
import { useWallpapers } from "../context/WallpaperContext.jsx";

// Loads the cover photo of every category (once) and returns them.
export default function useCovers() {
  const { covers, ensureCovers } = useWallpapers();
  useEffect(() => {
    ensureCovers();
  }, [ensureCovers]);
  return covers;
}
