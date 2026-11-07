import { createContext, useCallback, useContext, useMemo, useReducer, useRef, useState } from "react";
import { fetchCategoryCovers, fetchFeedPage, fetchPhotoById } from "../services/pexels.js";
import { makeFeedKey } from "../utils/feedKey.js";

const WallpaperContext = createContext(null);

// A feed = one list of wallpapers (a category, a search, or "all").
const emptyFeed = { items: [], page: 0, hasMore: true, status: "idle", error: null };

const initialState = {
  feeds: {}, // feedKey -> feed
  byId: {}, // wallpaper id -> wallpaper (so the details page can find it)
  covers: {}, // categoryId -> cover photo url
};

function reducer(state, action) {
  switch (action.type) {
    case "FEED_LOADING": {
      const feed = state.feeds[action.key] || emptyFeed;
      return {
        ...state,
        feeds: { ...state.feeds, [action.key]: { ...feed, status: "loading", error: null } },
      };
    }

    case "FEED_SUCCESS": {
      const feed = state.feeds[action.key] || emptyFeed;
      const seen = new Set(feed.items.map((item) => item.id));
      const fresh = [];
      const byId = { ...state.byId };
      action.items.forEach((item) => {
        if (!byId[item.id]) byId[item.id] = item;
        if (!seen.has(item.id)) {
          seen.add(item.id);
          fresh.push(item);
        }
      });
      return {
        ...state,
        byId,
        feeds: {
          ...state.feeds,
          [action.key]: {
            items: [...feed.items, ...fresh],
            page: action.page,
            hasMore: action.hasMore,
            status: "ready",
            error: null,
          },
        },
      };
    }

    case "FEED_ERROR": {
      const feed = state.feeds[action.key] || emptyFeed;
      return {
        ...state,
        feeds: { ...state.feeds, [action.key]: { ...feed, status: "error", error: action.error } },
      };
    }

    case "PHOTO_LOADED":
      return { ...state, byId: { ...state.byId, [action.wallpaper.id]: action.wallpaper } };

    case "COVERS_LOADED":
      return { ...state, covers: { ...state.covers, ...action.covers } };

    default:
      return state;
  }
}

// Holds ALL wallpaper data + the search text for the whole app.
// Pages don't call the API themselves - they ask this context.
export function WallpaperProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState("");

  // refs let our callbacks stay stable but still see the latest state
  const stateRef = useRef(state);
  stateRef.current = state;
  const inflight = useRef(new Set());
  const coversRequested = useRef(false);

  // Loads one page of a feed from the API.
  const runPage = useCallback(async (categoryId, term, page) => {
    const key = makeFeedKey(categoryId, term);
    if (inflight.current.has(key)) return; // already loading this feed
    inflight.current.add(key);
    dispatch({ type: "FEED_LOADING", key });
    try {
      const { items, hasMore } = await fetchFeedPage({ categoryId, term, page });
      dispatch({ type: "FEED_SUCCESS", key, items, page, hasMore });
    } catch (error) {
      dispatch({ type: "FEED_ERROR", key, error: error.message });
    } finally {
      inflight.current.delete(key);
    }
  }, []);

  // First load of a feed (does nothing if it is already loaded/loading)
  const ensureFeed = useCallback(
    (categoryId, term = "") => {
      const feed = stateRef.current.feeds[makeFeedKey(categoryId, term)];
      if (feed && (feed.status === "ready" || feed.status === "loading")) return;
      runPage(categoryId, term, 1);
    },
    [runPage]
  );

  const loadMoreFeed = useCallback(
    (categoryId, term = "") => {
      const feed = stateRef.current.feeds[makeFeedKey(categoryId, term)];
      if (!feed || !feed.hasMore || feed.status === "loading") return;
      runPage(categoryId, term, feed.page + 1);
    },
    [runPage]
  );

  // Try again after an error (continues from the page that failed)
  const retryFeed = useCallback(
    (categoryId, term = "") => {
      const feed = stateRef.current.feeds[makeFeedKey(categoryId, term)];
      runPage(categoryId, term, feed ? feed.page + 1 : 1);
    },
    [runPage]
  );

  // Used by the details page (also works after a browser refresh)
  const ensurePhoto = useCallback(async (id) => {
    const existing = stateRef.current.byId[id];
    if (existing) return existing;
    const wallpaper = await fetchPhotoById(id);
    dispatch({ type: "PHOTO_LOADED", wallpaper });
    return wallpaper;
  }, []);

  const ensureCovers = useCallback(async () => {
    if (coversRequested.current) return;
    coversRequested.current = true;
    const covers = await fetchCategoryCovers();
    dispatch({ type: "COVERS_LOADED", covers });
  }, []);

  const value = useMemo(
    () => ({
      feeds: state.feeds,
      byId: state.byId,
      covers: state.covers,
      searchTerm,
      setSearchTerm,
      ensureFeed,
      loadMoreFeed,
      retryFeed,
      ensurePhoto,
      ensureCovers,
    }),
    [state, searchTerm, ensureFeed, loadMoreFeed, retryFeed, ensurePhoto, ensureCovers]
  );

  return <WallpaperContext.Provider value={value}>{children}</WallpaperContext.Provider>;
}

export function useWallpapers() {
  const context = useContext(WallpaperContext);
  if (!context) throw new Error("useWallpapers must be used inside <WallpaperProvider>");
  return context;
}
