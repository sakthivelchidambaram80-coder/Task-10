
import { Link, useParams } from "react-router-dom";
import { Clock, MapPin, Star, CheckCircle2, ArrowLeft } from "lucide-react";
import { travelPackages } from "../data/travelData";
import "./PackageDetails.css";

export default function PackageDetails() {
  const { id } = useParams();
  const travel = travelPackages.find((p) => p.id === id);

  if (!travel) {
    return (
      <div className="container package-not-found">
        <h2>Travel package not found</h2>
        <Link className="primary-btn" to="/destinations">Browse destinations</Link>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <Link to="/destinations" className="back-link">
          <ArrowLeft size={17} /> All destinations
        </Link>

        <div className="detail-hero">
          <img src={travel.image} alt={travel.title} />
          <span className="detail-category">{travel.category}</span>
        </div>

        <div className="package-detail-layout">
          <div className="package-detail-main">
            <div className="detail-location">
              <MapPin size={17} /> {travel.country}
              <span><Star size={16} fill="currentColor" /> {travel.rating} ({travel.reviews} reviews)</span>
            </div>

            <h1 className="detail-title">{travel.title}</h1>
            <div className="detail-duration">
              <Clock size={18} /> {travel.duration} days of adventure
            </div>
            <p className="detail-description">{travel.description}</p>

            <div className="detail-section">
              <h2>Trip itinerary</h2>
              <div className="itinerary-list">
                {travel.itinerary.map((day, index) => (
                  <div className="itinerary-item" key={day}>
                    <span className="itinerary-number">{index + 1}</span>
                    <p>{day}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h2>What's included</h2>
              <div className="inclusion-grid">
                {travel.includes.map((item) => (
                  <div className="inclusion-item" key={item}>
                    <CheckCircle2 size={18} /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="detail-booking-card">
            <span className="price-label">Starting price</span>
            <div className="detail-price">
              ${travel.price.toLocaleString("en-US")}
              <span> / person</span>
            </div>
            <p>Prices are shown in USD for this demo package.</p>
            <div className="booking-card-row">
              <span>Duration</span><strong>{travel.duration} days</strong>
            </div>
            <div className="booking-card-row">
              <span>Destination</span><strong>{travel.country}</strong>
            </div>
            <Link to={`/booking/${travel.id}`} className="primary-btn detail-book-btn">
              Book this trip
            </Link>
            <small>Demo booking only · No payment collected</small>
          </aside>
        </div>
      </div>
    </section>
  );
}
