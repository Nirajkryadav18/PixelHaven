import themes from "../data/themes.js";
import useCategoryParam from "../hooks/useCategoryParam.js";
import useCovers from "../hooks/useCovers.js";
import CategoryFilter from "../components/CategoryFilter.jsx";
import ThemeCard from "../components/ThemeCard.jsx";
import "./Wallpapers.css"; // same page-title / grid spacing

function Themes() {
  const [categoryId, setCategory] = useCategoryParam();
  useCovers();

  const visibleThemes =
    categoryId === "all" ? themes : themes.filter((theme) => theme.categoryId === categoryId);

  return (
    <div className="container wallpapers-page">
      <h1 className="page-title">Themes</h1>
      <p className="page-subtitle">Click &ldquo;Apply Theme&rdquo; to change the colours of the whole website.</p>

      <CategoryFilter value={categoryId} onChange={setCategory} />

      {visibleThemes.length === 0 ? (
        <p className="empty-message">No themes in this category yet. Try another one.</p>
      ) : (
        <div className="grid">
          {visibleThemes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Themes;
