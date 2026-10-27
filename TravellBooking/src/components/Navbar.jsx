
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Plane } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon"><Plane size={23} /></span>
          <span>Travel    <span className="brand-accent"> B</span></span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/destinations" onClick={closeMenu}>Destinations</NavLink>
          <NavLink to="/my-bookings" onClick={closeMenu}>My Bookings</NavLink>
          <Link to="/destinations" className="nav-cta" onClick={closeMenu}>
            Explore 
          </Link>
        </nav>
      </div>
    </header>
  );
}
