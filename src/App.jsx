import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import Wallpapers from "./pages/Wallpapers.jsx";
import WallpaperDetails from "./pages/WallpaperDetails.jsx";
import Themes from "./pages/Themes.jsx";
import Categories from "./pages/Categories.jsx";
import Favorites from "./pages/Favorites.jsx";
import "./App.css";

// App only decides WHICH page shows for which URL.
// Data (wallpapers, favorites, theme, search) lives in the contexts
// (see src/context) - so no props need to be passed around.
function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallpapers" element={<Wallpapers />} />
          <Route path="/wallpapers/:id" element={<WallpaperDetails />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="*"
            element={
              <div className="container not-found">
                <h1>Page not found</h1>
                <Link to="/" className="btn btn-primary">Go Home</Link>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
