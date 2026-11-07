import { useEffect, useState } from "react";
import { useWallpapers } from "../context/WallpaperContext.jsx";

// Finds ONE wallpaper by id (from the context, or from the API if needed).
export default function useWallpaper(id) {
  const { byId, ensurePhoto } = useWallpapers();
  const [failed, setFailed] = useState({ id: null, message: null });
  const wallpaper = byId[id] || null;

  useEffect(() => {
    let cancelled = false;
    ensurePhoto(id).catch((error) => {
      if (!cancelled) setFailed({ id, message: error.message });
    });
    return () => {
      cancelled = true;
    };
  }, [id, ensurePhoto]);

  const error = failed.id === id ? failed.message : null;
  return { wallpaper, error, isLoading: !wallpaper && !error };
}
