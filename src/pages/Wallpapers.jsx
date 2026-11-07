import { CATEGORY_MAP } from "../data/categories.js";
import { useWallpapers } from "../context/WallpaperContext.jsx";
import useCategoryParam from "../hooks/useCategoryParam.js";
import useDebounce from "../hooks/useDebounce.js";
import useFeed from "../hooks/useFeed.js";
import CategoryFilter from "../components/CategoryFilter.jsx";
import WallpaperGrid from "../components/WallpaperGrid.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import "./Wallpapers.css";

function Wallpapers() {
  const [categoryId, setCategory] = useCategoryParam();
  const { searchTerm, setSearchTerm } = useWallpapers();

  // wait until the user stops typing, then search the API
  const term = useDebounce(searchTerm.trim(), 500);
  const feed = useFeed(categoryId, term);

  const category = CATEGORY_MAP[categoryId];
  const hasItems = feed.items.length > 0;

  return (
    <div className="container wallpapers-page">
      <h1 className="page-title">{category ? category.name : "Wallpapers"}</h1>

      <CategoryFilter value={categoryId} onChange={setCategory} />

      {term && (
        <p className="search-note">
          Results for &ldquo;{term}&rdquo;{" "}
          <button className="link-btn" onClick={() => setSearchTerm("")}>
            Clear search
          </button>
        </p>
      )}

      <WallpaperGrid
        items={feed.items}
        isLoading={feed.isLoading}
        error={feed.error}
        onRetry={feed.retry}
        skeletonCount={12}
      />

      {/* error while loading MORE wallpapers (we still show the old ones) */}
      {hasItems && feed.error && <StatusMessage message={feed.error} onRetry={feed.retry} />}

      {hasItems && feed.hasMore && !feed.error && (
        <div className="load-more">
          <button className="btn btn-primary" onClick={feed.loadMore} disabled={feed.isLoadingMore}>
            {feed.isLoadingMore ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Wallpapers;
