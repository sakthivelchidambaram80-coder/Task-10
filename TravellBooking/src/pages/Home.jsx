
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, ShieldCheck, Headphones, Globe } from "lucide-react";
import { travelPackages } from "../data/travelData";
import PackageCard from "../components/PackageCard";
import "./Home.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/destinations?search=${encodeURIComponent(search)}`);
  }

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-overlay">
          <div className="container home-hero-content">
            <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
            <h1>Explore the world.<br />Create lasting memories.</h1>
            <p>
              Discover beautiful destinations and unforgettable travel
              experiences made for you.
            </p>

            <form className="hero-search" onSubmit={handleSearch}>
              <Search size={21} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Where do you want to go?"
                aria-label="Search destinations"
              />
              <button className="primary-btn" type="submit">Search</button>
            </form>

            <div className="hero-note">
              <ShieldCheck size={17} />
              Discover new places. Plan your next adventure.
            </div>
          </div>
        </div>
      </section>

      <section className="home-benefits">
        <div className="container benefit-grid">
          <div><Globe /><span><strong>Unique destinations</strong><small>Places worth discovering</small></span></div>
          <div><ShieldCheck /><span><strong>Simple booking</strong><small>Easy trip planning</small></span></div>
          <div><Headphones /><span><strong>Travel support</strong><small>Help when you need it</small></span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="home-section-top">
            <div>
              <span className="eyebrow dark-eyebrow">HANDPICKED FOR YOU</span>
              <h2 className="section-heading">Popular travel packages</h2>
              <p className="section-description">
                Find your next escape among our favorite journeys.
              </p>
            </div>
            <button
              className="text-link"
              onClick={() => navigate("/destinations")}
            >
              View all packages <ArrowRight size={17} />
            </button>
          </div>

          <div className="package-grid">
            {travelPackages.slice(0, 3).map((travel) => (
              <PackageCard key={travel.id} travel={travel} />
            ))}
          </div>
        </div>
      </section>

      <section className="section home-more">
        <div className="container home-more-inner">
          <div>
            <span className="eyebrow">YOUR NEXT ADVENTURE</span>
            <h2>There's a whole world waiting for you.</h2>
            <p>Browse our curated trips and find the one that feels right.</p>
          </div>
          <button
            className="primary-btn"
            onClick={() => navigate("/destinations")}
          >
            Explore destinations <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </>
  );
}
