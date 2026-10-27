
import { Link } from "react-router-dom";
import { Clock, MapPin, Star, ArrowUpRight } from "lucide-react";
import "./PackageCard.css";

export default function PackageCard({ travel }) {
  return (
    <article className="package-card">
      <Link to={`/package/${travel.id}`} className="package-image-link">
        <img src={travel.image} alt={travel.title} className="package-image" />
        <span className="package-category">{travel.category}</span>
      </Link>

      <div className="package-content">
        <div className="package-location">
          <MapPin size={15} />
          {travel.country}
          <span className="package-rating">
            <Star size={15} fill="currentColor" /> {travel.rating}
          </span>
        </div>

        <h3>
          <Link to={`/package/${travel.id}`}>{travel.title}</Link>
        </h3>

        <div className="package-meta">
          <span><Clock size={15} /> {travel.duration} days</span>
          <span>{travel.reviews} reviews</span>
        </div>

        <div className="package-bottom">
          <div>
            <span className="price-label">Starting from</span>
            <div className="package-price">
              ${travel.price.toLocaleString("en-US")}
              <span> / person</span>
            </div>
          </div>

          <Link
            to={`/package/${travel.id}`}
            className="package-arrow"
            aria-label={`View ${travel.title}`}
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </article>
  );
}
