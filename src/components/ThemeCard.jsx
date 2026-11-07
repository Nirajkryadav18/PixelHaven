import { FiHeart, FiCheck } from "react-icons/fi";
import { CATEGORY_MAP } from "../data/categories.js";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useSiteTheme } from "../context/ThemeContext.jsx";
import { useWallpapers } from "../context/WallpaperContext.jsx";
import "./ThemeCard.css";

// One theme: a preview of its colours + "Apply Theme" button.
function ThemeCard({ theme }) {
  const { activeTheme, applyTheme } = useSiteTheme();
  const { isFavorite, toggleTheme } = useFavorites();
  const { covers } = useWallpapers();

  const category = CATEGORY_MAP[theme.categoryId];
  const cover = covers[theme.categoryId];
  const isActive = activeTheme.id === theme.id;
  const favorited = isFavorite(theme.id, "theme");
  const { bg, surface, text, accent, accentText, border } = theme.colors;

  return (
    <div className={`theme-card ${isActive ? "active" : ""}`}>
      <div
        className="theme-preview"
        style={{
          backgroundColor: bg,
          backgroundImage: cover
            ? `linear-gradient(to top, ${bg} 5%, transparent 75%), url(${cover})`
            : undefined,
        }}
      >
        <span className="theme-category-tag" style={{ background: surface, color: text, borderColor: border }}>
          {category.name}
        </span>
        <div className="theme-mock">
          <span className="mock-button" style={{ background: accent, color: accentText }}>
            Button
          </span>
          <span className="mock-swatch" style={{ background: surface, borderColor: border }} />
          <span className="mock-swatch" style={{ background: accent }} />
          <span className="mock-swatch" style={{ background: text }} />
        </div>
      </div>

      <div className="theme-info">
        <div className="theme-info-header">
          <h3>{theme.name}</h3>
          <button
            className={`icon-btn ${favorited ? "favorited" : ""}`}
            onClick={() => toggleTheme(theme, category.name, cover)}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <FiHeart />
          </button>
        </div>
        <p className="theme-desc">{theme.description}</p>
        <button
          className={`btn theme-apply-btn ${isActive ? "btn-outline" : "btn-primary"}`}
          onClick={() => applyTheme(theme.id)}
          disabled={isActive}
        >
          {isActive ? (
            <>
              <FiCheck /> Applied
            </>
          ) : (
            "Apply Theme"
          )}
        </button>
      </div>
    </div>
  );
}

export default ThemeCard;
