
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CalendarDays, Users, ShieldCheck } from "lucide-react";
import { travelPackages } from "../data/travelData";
import "./Booking.css";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const travel = travelPackages.find((p) => p.id === id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    travelers: "1",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const total = useMemo(
    () => travel ? travel.price * Number(form.travelers) : 0,
    [travel, form.travelers]
  );

  if (!travel) {
    return (
      <div className="container booking-missing">
        <h2>Package not found</h2>
        <Link to="/destinations" className="primary-btn">Explore packages</Link>
      </div>
    );
  }

  function updateField(e) {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitError("");
  }

  function validate() {
    const nextErrors = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Enter your full name (at least 2 characters).";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.date || form.date < minDate) {
      nextErrors.date = "Choose today or a future travel date.";
    }

    if (
      !Number.isInteger(Number(form.travelers)) ||
      Number(form.travelers) < 1 ||
      Number(form.travelers) > 20
    ) {
      nextErrors.travelers = "Choose between 1 and 20 travelers.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    try {
      const existing = JSON.parse(localStorage.getItem("travel-bookings") || "[]");
      if (!Array.isArray(existing)) throw new Error("Invalid bookings data");

      const booking = {
        bookingId: `TRV-${Date.now().toString().slice(-8)}`,
        packageId: travel.id,
        packageTitle: travel.title,
        country: travel.country,
        image: travel.image,
        pricePerPerson: travel.price,
        travelers: Number(form.travelers),
        total,
        date: form.date,
        name: form.name.trim(),
        email: form.email.trim(),
        notes: form.notes.trim(),
        status: "Confirmed",
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "travel-bookings",
        JSON.stringify([booking, ...existing])
      );

      navigate("/my-bookings", {
        state: { message: "Your demo booking has been saved successfully." },
      });
    } catch {
      setSubmitError(
        "Unable to save your booking. Check your browser storage and try again."
      );
    }
  }

  return (
    <section className="section booking-page">
      <div className="container">
        <div className="booking-heading">
          <span className="eyebrow dark-eyebrow">LET'S PLAN YOUR TRIP</span>
          <h1 className="section-heading">Complete your booking</h1>
          <p className="section-description">
            Enter your details to save your travel booking.
          </p>
        </div>

        <div className="booking-layout">
          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <h2>Traveler information</h2>

            <div className="booking-field">
              <label htmlFor="name">Full name *</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
              {errors.name && <small className="field-error">{errors.name}</small>}
            </div>

            <div className="booking-field">
              <label htmlFor="email">Email address *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
              {errors.email && <small className="field-error">{errors.email}</small>}
            </div>

            <div className="booking-field">
              <label htmlFor="date">Travel date *</label>
              <div className="booking-input-icon">
                <CalendarDays size={18} />
                <input
                  id="date"
                  type="date"
                  name="date"
                  min={minDate}
                  value={form.date}
                  onChange={updateField}
                  required
                />
              </div>
              {errors.date && <small className="field-error">{errors.date}</small>}
            </div>

            <div className="booking-field">
              <label htmlFor="travelers">Number of travelers *</label>
              <div className="booking-input-icon">
                <Users size={18} />
                <select
                  id="travelers"
                  name="travelers"
                  value={form.travelers}
                  onChange={updateField}
                  required
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "traveler" : "travelers"}
                    </option>
                  ))}
                </select>
              </div>
              {errors.travelers && (
                <small className="field-error">{errors.travelers}</small>
              )}
            </div>

            <div className="booking-field">
              <label htmlFor="notes">Special requests (optional)</label>
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={updateField}
                placeholder="Any preferences for your trip?"
                rows="3"
                maxLength={500}
              />
            </div>

            {submitError && <p className="field-error">{submitError}</p>}

            <button type="submit" className="primary-btn confirm-booking-btn">
              Confirm demo booking
            </button>
            <p className="booking-disclaimer">
              <ShieldCheck size={16} /> No payment is collected. This is a
              frontend demonstration.
            </p>
          </form>

          <aside className="booking-summary">
            <img src={travel.image} alt={travel.title} />
            <div className="booking-summary-content">
              <span className="eyebrow dark-eyebrow">YOUR TRIP</span>
              <h2>{travel.title}</h2>
              <p>{travel.country} · {travel.duration} days</p>

              <div className="summary-price-row">
                <span>Price per person</span>
                <strong>${travel.price.toLocaleString("en-US")}</strong>
              </div>
              <div className="summary-price-row">
                <span>Travelers</span>
                <strong>{form.travelers}</strong>
              </div>
              <div className="summary-total">
                <span>Total price</span>
                <strong>${total.toLocaleString("en-US")}</strong>
              </div>
              <small className="summary-currency">
                Total = price per person × number of travelers. USD.
              </small>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
