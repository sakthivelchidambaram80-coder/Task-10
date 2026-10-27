
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarDays, Users, MapPin, Trash2, Luggage } from "lucide-react";
import "./MyBookings.css";

function readBookings() {
  try {
    const saved = JSON.parse(localStorage.getItem("travel-bookings") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function MyBookings() {
  const [bookings, setBookings] = useState(readBookings);
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  function cancelBooking(bookingId) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this demo booking?"
    );

    if (!confirmed) return;

    const updated = bookings.filter((b) => b.bookingId !== bookingId);

    try {
      localStorage.setItem("travel-bookings", JSON.stringify(updated));
      setBookings(updated);
      setMessage("Booking removed successfully.");
    } catch {
      setMessage("Unable to update bookings in browser storage.");
    }
  }

  return (
    <section className="section my-bookings-page">
      <div className="container">
        <div className="my-bookings-heading">
          <div>
            <span className="eyebrow dark-eyebrow">YOUR TRAVEL DASHBOARD</span>
            <h1 className="section-heading">My bookings</h1>
            <p className="section-description">
              Keep track of the trips you've planned.
            </p>
          </div>
          <Link to="/destinations" className="primary-btn">
            Explore more trips
          </Link>
        </div>

        {message && (
          <div className="booking-message" role="status">
            {message}
            <button onClick={() => setMessage("")} aria-label="Dismiss message">
              ×
            </button>
          </div>
        )}

        <div className="bookings-count">
          <strong>{bookings.length} {bookings.length === 1 ? "booking" : "bookings"}</strong>
          <span>Saved on this device</span>
        </div>

        {bookings.length === 0 ? (
          <div className="no-bookings">
            <div className="no-bookings-icon"><Luggage size={34} /></div>
            <h2>Your next adventure starts here</h2>
            <p>You haven't saved any travel bookings yet. Find a destination and plan your next getaway.</p>
            <Link to="/destinations" className="primary-btn">
              Browse destinations
            </Link>
          </div>
        ) : (
          <div className="my-bookings-list">
            {bookings.map((booking) => (
              <article className="my-booking-card" key={booking.bookingId}>
                <img
                  className="my-booking-image"
                  src={booking.image}
                  alt={booking.packageTitle}
                />

                <div className="my-booking-content">
                  <div className="my-booking-top">
                    <span className="booking-reference">
                      REF: {booking.bookingId}
                    </span>
                    <span className="booking-status">{booking.status}</span>
                  </div>

                  <h2>{booking.packageTitle}</h2>
                  <div className="my-booking-country">
                    <MapPin size={15} /> {booking.country}
                  </div>

                  <div className="my-booking-details">
                    <span><CalendarDays size={15} /> {booking.date}</span>
                    <span>
                      <Users size={15} /> {booking.travelers}{" "}
                      {booking.travelers === 1 ? "traveler" : "travelers"}
                    </span>
                  </div>

                  <div className="my-booking-bottom">
                    <div>
                      <small>Total price · USD</small>
                      <strong>${Number(booking.total).toLocaleString("en-US")}</strong>
                    </div>

                    <button
                      className="cancel-booking"
                      onClick={() => cancelBooking(booking.bookingId)}
                    >
                      <Trash2 size={16} /> Cancel
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="bookings-storage-note">
          Demo only: your bookings are saved in this browser's local storage.
          They are not synced across devices.
        </p>
      </div>
    </section>
  );
}
