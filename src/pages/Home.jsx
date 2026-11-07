import { Link, useNavigate } from "react-router-dom";
import themes from "../data/themes.js";
import { CATEGORIES, CATEGORY_MAP, HIGHLIGHT_IDS } from "../data/categories.js";
import useFeed from "../hooks/useFeed.js";
import useCovers from "../hooks/useCovers.js";
import CategoryFilter from "../components/CategoryFilter.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import WallpaperGrid from "../components/WallpaperGrid.jsx";
import ThemeCard from "../components/ThemeCard.jsx";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  useCovers(); // loads category cover photos (used by category + theme cards)

  // ONE request feeds the whole page: the "All" feed is a mix of the
  // main categories, so the rows below are just filtered from it.
  const feed = useFeed("all");
  const featured = feed.items.slice(0, 8);

  const goToCategory = (id) =>
    navigate(id === "all" ? "/wallpapers" : `/wallpapers?category=${id}`);

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>
            Find the Perfect <span>Wallpaper</span> for Your Screen
          </h1>
          <p>
            Indian culture, supercars, cartoons and much more. Free high quality
            wallpapers and themes for desktop and mobile.
          </p>
          <div className="hero-buttons">
            <Link to="/wallpapers" className="btn btn-primary">Browse Wallpapers</Link>
            <Link to="/themes" className="btn btn-outline">Explore Themes</Link>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Category buttons - click one to open that category */}
        <div className="home-filter">
          <CategoryFilter value={null} onChange={goToCategory} />
        </div>

        <div className="section-heading">
          <h2>Featured Wallpapers</h2>
          <Link to="/wallpapers">View all</Link>
        </div>
        <WallpaperGrid
          items={featured}
          isLoading={feed.isLoading}
          error={feed.error}
          onRetry={feed.retry}
          skeletonCount={8}
        />

        {/* One row for each highlighted category (Indian Culture, Cars, Cartoon) */}
        {!feed.error &&
          HIGHLIGHT_IDS.map((id) => (
            <section key={id}>
              <div className="section-heading">
                <h2>{CATEGORY_MAP[id].name}</h2>
                <Link to={`/wallpapers?category=${id}`}>View all</Link>
              </div>
              <WallpaperGrid
                items={feed.items.filter((item) => item.categoryId === id).slice(0, 4)}
                isLoading={feed.isLoading}
                skeletonCount={4}
              />
            </section>
          ))}

        <div className="section-heading">
          <h2>Popular Themes</h2>
          <Link to="/themes">View all</Link>
        </div>
        <div className="grid">
          {themes.slice(2, 5).map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>

        <div className="section-heading">
          <h2>Browse Categories</h2>
          <Link to="/categories">View all</Link>
        </div>
        <div className="grid">
          {CATEGORIES.slice(0, 6).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
