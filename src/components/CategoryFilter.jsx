import { CATEGORIES } from "../data/categories.js";
import "./CategoryFilter.css";

// The row of category buttons. It is used on EVERY page
// (Home, Wallpapers, Themes, Favorites) so categories are always available.
//   value    : the selected category id ("all" or e.g. "cars"), null = none
//   onChange : called with the clicked category id
function CategoryFilter({ value, onChange, showAll = true }) {
  return (
    <div className="filter-bar" role="group" aria-label="Categories">
      {showAll && (
        <button
          className={`filter-btn ${value === "all" ? "active" : ""}`}
          onClick={() => onChange("all")}
        >
          All
        </button>
      )}
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          className={`filter-btn ${value === category.id ? "active" : ""}`}
          onClick={() => onChange(category.id)}
        >
          <span
            className="filter-dot"
            style={{ background: `linear-gradient(135deg, ${category.colors[0]}, ${category.colors[1]})` }}
          />
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
