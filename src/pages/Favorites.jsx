import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { CATEGORY_MAP } from "../data/categories.js";
import { useFavorites } from "../context/FavoritesContext.jsx";
import useCategoryParam from "../hooks/useCategoryParam.js";
import CategoryFilter from "../components/CategoryFilter.jsx";
import "./Wallpapers.css";
import "./Favorites.css";

const TYPES = [
  { id: "all", label: "All" },
  { id: "wallpaper", label: "Wallpapers" },
  { id: "theme", label: "Themes" },
];

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const [categoryId, setCategory] = useCategoryParam();
  const [type, setType] = useState("all");

  if (favorites.length === 0) {
    return (
      <div className="container favorites-empty">
        <FiHeart size={48} />
        <h2>No favorites yet</h2>
        <p>Tap the heart icon on any wallpaper or theme to save it here.</p>
      </div>
    );
  }

  const visible = favorites.filter(
    (item) =>
      (categoryId === "all" || item.categoryId === categoryId) &&
      (type === "all" || item.type === type)
  );

  return (
    <div className="container wallpapers-page">
      <h1 className="page-title">Your Favorites</h1>

      <CategoryFilter value={categoryId} onChange={setCategory} />

      <div className="filter-bar">
        {TYPES.map((option) => (
          <button
            key={option.id}
            className={`filter-btn ${type === option.id ? "active" : ""}`}
            onClick={() => setType(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="empty-message">Nothing saved here yet. Try another category or type.</p>
      ) : (
        <div className="grid">
          {visible.map((item) => {
            const category = CATEGORY_MAP[item.categoryId];
            const thumbStyle =
              item.image || !category
                ? undefined
                : { background: `linear-gradient(135deg, ${category.colors[0]}, ${category.colors[1]})` };
            const thumb = item.image ? (
              <img src={item.image} alt={item.title} loading="lazy" />
            ) : (
              <div className="favorite-thumb" style={thumbStyle} />
            );

            return (
              <div className="favorite-card" key={`${item.type}-${item.id}`}>
                {item.type === "wallpaper" ? (
                  <Link to={`/wallpapers/${item.id}`}>{thumb}</Link>
                ) : (
                  thumb
                )}
                <div className="favorite-info">
                  <div>
                    <h3>{item.title}</h3>
                    <p className="category-text">
                      {item.category} &middot; {item.type}
                    </p>
                  </div>
                  <button
                    className="icon-btn favorited"
                    onClick={() => toggleFavorite(item)}
                    aria-label="Remove from favorites"
                  >
                    <FiHeart />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Favorites;
