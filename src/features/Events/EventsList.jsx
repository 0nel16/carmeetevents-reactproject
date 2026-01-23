import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./Events.module.css";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events");
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch(() => toast.error("Could not load events"));
  }, []);

  return (
    <div className={styles.page}>
      {events.length === 0 && (
        <div className={styles.emptyState}>
          <h2>Stay tuned</h2>
          <p>Upcoming events will appear here soon.</p>
        </div>
      )}
      {events.length > 0 && (
        <>
          <div className={styles.headerRow}>
            <h1>Upcoming Events</h1>
          </div>
          <div className={styles.grid}>
            {events.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className={styles.cardLink}
              >
                <div className={styles.card}>
                  {event.imageUrl && (
                    <div className={styles.imageWrapper}>
                      {event.category && (
                        <span
                          className={`${styles.badge} ${styles[event.category]}`}
                        >
                          {event.category}
                        </span>
                      )}
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className={styles.cardImage}
                      />
                    </div>
                  )}
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{event.title}</h3>
                    <p className={styles.meta}>{event.location}</p>
                    <p className={styles.meta}>{event.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
