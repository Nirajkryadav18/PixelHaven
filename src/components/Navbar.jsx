import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSearch, FiImage } from "react-icons/fi";
import { useWallpapers } from "../context/WallpaperContext.jsx";
import "./Navbar.css";

function Navbar() {
  // The search text lives in WallpaperContext, so no props are needed.
  const { searchTerm, setSearchTerm } = useWallpapers();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const closeMenu = () => setMenuOpen(false);

  // Typing anywhere takes the user to the Wallpapers page to see results
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (pathname !== "/wallpapers") navigate("/wallpapers");
  };

  const searchBox = (extraClass) => (
    <div className={`search-box ${extraClass}`}>
      <FiSearch />
      <input
        type="search"
        placeholder="Search wallpapers..."
        value={searchTerm}
        onChange={handleSearch}
        aria-label="Search wallpapers"
      />
    </div>
  );

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <FiImage className="logo-icon" />
          PixelHaven
        </Link>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={closeMenu} end>Home</NavLink>
          <NavLink to="/wallpapers" onClick={closeMenu}>Wallpapers</NavLink>
          <NavLink to="/themes" onClick={closeMenu}>Themes</NavLink>
          <NavLink to="/categories" onClick={closeMenu}>Categories</NavLink>
          <NavLink to="/favorites" onClick={closeMenu}>Favorites</NavLink>
          {/* search inside the mobile menu */}
          {searchBox("mobile-only")}
        </nav>

        {/* search on laptop / big screens */}
        {searchBox("desktop-only")}

        <button
          className="hamburger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
