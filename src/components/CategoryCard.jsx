import { Link } from "react-router-dom";
import { useWallpapers } from "../context/WallpaperContext.jsx";
import "./CategoryCard.css";

// Clicking a category opens the Wallpapers page for it: /wallpapers?category=cars
function CategoryCard({ category }) {
  const { covers } = useWallpapers();
  const cover = covers[category.id];

  return (
    <Link
      to={`/wallpapers?category=${category.id}`}
      className="category-card"
      style={{ background: `linear-gradient(135deg, ${category.colors[0]}, ${category.colors[1]})` }}
    >
      {cover && <img src={cover} alt={category.name} loading="lazy" />}
      <div className="category-overlay">
        <h3>{category.name}</h3>
      </div>
    </Link>
  );
}

export default CategoryCard;
