import { useEffect } from "react";
import { useWallpapers } from "../context/WallpaperContext.jsx";
import { makeFeedKey } from "../utils/feedKey.js";

const EMPTY = { items: [], hasMore: false, status: "idle", error: null };

// Gives a page everything it needs to show a list of wallpapers:
//   const { items, isLoading, error, hasMore, loadMore, retry } = useFeed("cars");
export default function useFeed(categoryId = "all", term = "", enabled = true) {
  const { feeds, ensureFeed, loadMoreFeed, retryFeed } = useWallpapers();
  const key = makeFeedKey(categoryId, term);

  useEffect(() => {
    if (enabled) ensureFeed(categoryId, term);
  }, [enabled, key, categoryId, term, ensureFeed]);

  const feed = feeds[key] || EMPTY;
  const hasItems = feed.items.length > 0;

  return {
    items: feed.items,
    error: feed.error,
    hasMore: feed.hasMore,
    isLoading: enabled && !hasItems && !feed.error && feed.status !== "ready",
    isLoadingMore: hasItems && feed.status === "loading",
    loadMore: () => loadMoreFeed(categoryId, term),
    retry: () => retryFeed(categoryId, term),
  };
}
