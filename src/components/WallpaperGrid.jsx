import WallpaperCard from "./WallpaperCard.jsx";
import StatusMessage from "./StatusMessage.jsx";
import "./WallpaperGrid.css";

// Shows a list of wallpapers and takes care of the 3 "special" states:
// loading (skeleton boxes), error (message + retry) and empty.
function WallpaperGrid({
  items,
  isLoading,
  error,
  onRetry,
  skeletonCount = 8,
  emptyText = "No wallpapers found. Try a different search or category.",
}) {
  if (error && items.length === 0) {
    return <StatusMessage message={error} onRetry={onRetry} />;
  }

  if (isLoading && items.length === 0) {
    return (
      <div className="grid">
        {Array.from({ length: skeletonCount }, (_, index) => (
          <div className="skeleton-card" key={index} />
        ))}
      </div>
    );
  }

  if (items.length === 0) return <p className="empty-message">{emptyText}</p>;

  return (
    <div className="grid">
      {items.map((wallpaper) => (
        <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
      ))}
    </div>
  );
}

export default WallpaperGrid;
