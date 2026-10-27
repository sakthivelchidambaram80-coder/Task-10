
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { travelPackages } from "../data/travelData";
import PackageCard from "../components/PackageCard";
import "./Destinations.css";

export default function Destinations() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [country, setCountry] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const countries = [...new Set(travelPackages.map((p) => p.country))];
  const categories = [...new Set(travelPackages.map((p) => p.category))];

  const filtered = useMemo(() => {
    let result = travelPackages.filter((p) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.country.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);

      return (
        matchesSearch &&
        (country === "All" || p.country === country) &&
        (category === "All" || p.category === category)
      );
    });

    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [search, country, category, sort]);

  function updateSearch(value) {
    setSearch(value);
    setParams(value ? { search: value } : {});
  }

  function resetFilters() {
    setSearch("");
    setCountry("All");
    setCategory("All");
    setSort("featured");
    setParams({});
  }

  return (
    <section className="section destinations-page">
      <div className="container">
        <div className="destinations-heading">
          <span className="eyebrow dark-eyebrow">FIND YOUR NEXT ESCAPE</span>
          <h1 className="section-heading">Explore destinations</h1>
          <p className="section-description">
            Discover inspiring places and choose a journey that matches your style.
          </p>
        </div>

        <div className="filter-panel">
          <label className="destination-search">
            <Search size={19} />
            <input
              value={search}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="Search destination or package..."
            />
          </label>

          <label className="filter-field">
            <span>Country</span>
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="All">All countries</option>
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>

          <label className="filter-field">
            <span>Travel style</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All styles</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>

          <label className="filter-field">
            <span>Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>

          <button className="reset-filter" onClick={resetFilters}>
            <SlidersHorizontal size={16} /> Reset
          </button>
        </div>

        <div className="results-line">
          <strong>{filtered.length} travel packages</strong>
          <span>Find the trip that feels like you.</span>
        </div>

        {filtered.length > 0 ? (
          <div className="destination-grid">
            {filtered.map((travel) => (
              <PackageCard key={travel.id} travel={travel} />
            ))}
          </div>
        ) : (
          <div className="empty-destinations">
            <Search size={32} />
            <h3>No matching packages</h3>
            <p>Try another search or change your filters.</p>
            <button className="primary-btn" onClick={resetFilters}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
