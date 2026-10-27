
import { Link } from "react-router-dom";
import { Plane, Mail, MapPin } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link to="/" className="brand footer-brand">
            <span className="brand-icon"><Plane size={22} /></span>
            <span>Travel <span className="brand-accent">B</span></span>
          </Link>
          <p>
            Discover extraordinary places, explore amazing experiences,
            and make your next journey unforgettable.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </div>

        <div>
          <h4>Contact</h4>
          <p><Mail size={16} /> hello@wanderly.example</p>
          <p><MapPin size={16} /> Your next destination</p>
        </div>
      </div>

      <div className="container footer-bottom">
        © {new Date().getFullYear()} Wanderly. Demo travel booking website.
      </div>
    </footer>
  );
}
