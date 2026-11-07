import { Link, useParams } from "react-router-dom";
import { FiHeart, FiDownload, FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { useFavorites } from "../context/FavoritesContext.jsx";
import useWallpaper from "../hooks/useWallpaper.js";
import useFeed from "../hooks/useFeed.js";
import { downloadImage, toFileName } from "../utils/download.js";
import WallpaperGrid from "../components/WallpaperGrid.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import "./WallpaperDetails.css";

function WallpaperDetails() {
  const { id } = useParams(); // /wallpapers/123 -> "123"
  const { wallpaper, isLoading, error } = useWallpaper(id);
  const { isFavorite, toggleWallpaper } = useFavorites();

  // "Related" = more wallpapers from the same category
  const related = useFeed(wallpaper?.categoryId || "all", "", Boolean(wallpaper));
  const relatedItems = related.items.filter((item) => item.id !== id).slice(0, 4);

  if (error) {
    return (
      <div className="container details-page">
        <StatusMessage message={error} />
        <Link to="/wallpapers" className="btn btn-outline">Back to Wallpapers</Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container details-page">
        <div className="details-layout">
          <div className="skeleton-card details-skeleton" />
        </div>
      </div>
    );
  }

  const favorited = isFavorite(wallpaper.id, "wallpaper");
  const backLink = wallpaper.categoryId
    ? `/wallpapers?category=${wallpaper.categoryId}`
    : "/wallpapers";

  return (
    <div className="container details-page">
      <Link to={backLink} className="back-link">
        <FiArrowLeft /> Back to {wallpaper.category === "Wallpaper" ? "Wallpapers" : wallpaper.category}
      </Link>

      <div className="details-layout">
        <img
          src={wallpaper.fullImage}
          alt={wallpaper.title}
          className="details-image"
          style={{ background: wallpaper.avgColor }}
        />

        <div className="details-info">
          <h1>{wallpaper.title}</h1>
          <p className="category-text">
            {wallpaper.categoryId ? (
              <Link to={backLink} className="details-category">{wallpaper.category}</Link>
            ) : (
              wallpaper.category
            )}{" "}
            &middot; {wallpaper.resolution} &middot; {wallpaper.width} &times; {wallpaper.height}
          </p>

          <p className="details-description">
            Photo by{" "}
            <a href={wallpaper.photographerUrl} target="_blank" rel="noreferrer">
              {wallpaper.photographer}
            </a>{" "}
            on{" "}
            <a href={wallpaper.pexelsUrl} target="_blank" rel="noreferrer">
              Pexels <FiExternalLink />
            </a>
            .
          </p>

          <div className="details-actions">
            <button
              className="btn btn-primary"
              onClick={() => downloadImage(wallpaper.downloadUrl, toFileName(wallpaper.title))}
            >
              <FiDownload /> Download
            </button>
            <button
              className={`btn btn-outline ${favorited ? "favorited-btn" : ""}`}
              onClick={() => toggleWallpaper(wallpaper)}
            >
              <FiHeart /> {favorited ? "Remove Favorite" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      <div className="section-heading">
        <h2>{wallpaper.categoryId ? `More ${wallpaper.category}` : "You may also like"}</h2>
      </div>
      <WallpaperGrid
        items={relatedItems}
        isLoading={related.isLoading}
        error={related.error}
        onRetry={related.retry}
        skeletonCount={4}
      />
    </div>
  );
}

export default WallpaperDetails;
