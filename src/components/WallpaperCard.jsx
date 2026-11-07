import { Link } from "react-router-dom";
import { FiHeart, FiDownload, FiEye } from "react-icons/fi";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { downloadImage, toFileName } from "../utils/download.js";
import "./WallpaperCard.css";

// Shows ONE wallpaper. Favorites come from context, so it only needs the wallpaper.
function WallpaperCard({ wallpaper }) {
  const { isFavorite, toggleWallpaper } = useFavorites();
  const favorited = isFavorite(wallpaper.id, "wallpaper");

  const handleFavorite = () => toggleWallpaper(wallpaper);
  const handleDownload = () =>
    downloadImage(wallpaper.downloadUrl, toFileName(wallpaper.title));

  return (
    <div className="wallpaper-card">
      <div className="wallpaper-image-wrap" style={{ background: wallpaper.avgColor }}>
        <Link to={`/wallpapers/${wallpaper.id}`} aria-label={`Open ${wallpaper.title}`}>
          <img src={wallpaper.image} alt={wallpaper.title} loading="lazy" />
        </Link>

        {wallpaper.categoryId ? (
          <Link to={`/wallpapers?category=${wallpaper.categoryId}`} className="tag category-tag">
            {wallpaper.category}
          </Link>
        ) : (
          <span className="tag category-tag">{wallpaper.category}</span>
        )}
        <span className="tag resolution-tag">{wallpaper.resolution}</span>
      </div>

      <div className="wallpaper-info">
        <h3 title={wallpaper.title}>{wallpaper.title}</h3>

        <div className="card-actions">
          <button
            className={`icon-btn ${favorited ? "favorited" : ""}`}
            onClick={handleFavorite}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <FiHeart />
          </button>
          <button className="icon-btn" onClick={handleDownload} aria-label="Download">
            <FiDownload />
          </button>
          <Link to={`/wallpapers/${wallpaper.id}`} className="icon-btn" aria-label="View">
            <FiEye />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WallpaperCard;
