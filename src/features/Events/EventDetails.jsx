import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { useAuthContext } from "../Auth/AuthContext";
import toast from "react-hot-toast";
import styles from "./Events.module.css";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, accessToken } = useAuthContext();

  const [event, setEvent] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load event");
        return res.json();
      })
      .then((data) => setEvent(data))
      .catch(() =>
        toast.error("Could not load event details", {
          id: "event-details-load",
        }),
      );
  }, [id]);

  if (!event) return <p>Loading...</p>;

  const isOwner = user && user.id === event.userId;

  function handleDelete() {
    fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        toast.success("Event deleted");
        navigate("/events");
      })
      .catch(() => toast.error("Could not delete event"));
  }

  return (
    <div className={styles.eventDetails}>
      {/* HERO */}
      <section className={styles.eventHero}>
        <img src={event.imageUrl} alt={event.title} />

        <div className={styles.eventHeroOverlay}>
          <span className={`${styles.badge} ${styles[event.category]}`}>
            {event.category}
          </span>

          <h1 className={styles.eventTitle}>{event.title}</h1>
        </div>
      </section>

      {/* INFO BAR */}
      <section className={styles.eventMeta}>
        <div className={styles.metaItem}>📅 {event.date}</div>
        <div className={styles.metaItem}>📍 {event.location}</div>
        <div className={styles.metaItem}>
          💶 {event.price === 0 ? "Free" : `€${event.price}`}
        </div>
        <div className={styles.metaItem}>👥 {event.capacity} spots</div>
      </section>

      {/* CONTENT */}
      <section className={styles.eventContent}>
        <h2>About this event</h2>
        <p>{event.description}</p>
      </section>

      {/* OWNER ACTIONS */}
      {isOwner && (
        <section className={styles.eventActions}>
          <Link to={`/events/${event.id}/edit`} className={styles.editBtn}>
            ✏️ Edit
          </Link>
          <button
            onClick={() => setShowConfirm(true)}
            className={styles.deleteBtn}
          >
            🗑 Delete
          </button>
        </section>
      )}
      {showConfirm && (
        <ConfirmModal
          title="Delete event"
          message="Are you sure you want to delete this event?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
