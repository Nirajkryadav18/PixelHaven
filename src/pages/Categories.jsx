import { CATEGORIES } from "../data/categories.js";
import useCovers from "../hooks/useCovers.js";
import CategoryCard from "../components/CategoryCard.jsx";
import "./Wallpapers.css";

function Categories() {
  useCovers();

  return (
    <div className="container wallpapers-page">
      <h1 className="page-title">Categories</h1>
      <div className="grid">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
