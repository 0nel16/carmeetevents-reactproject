import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";
import styles from "./Events.module.css";

export default function MyEvents() {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/events?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, [user]);

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <h1>My Events</h1>
      </div>

      {user && events.length === 0 && (
        <div className={styles.emptyState}>
          <h2>No events yet</h2>
          <p>You haven’t created any events.</p>
          <Link to="/events/add" className={styles.addBtn}>
            Add Event
          </Link>
        </div>
      )}

      {user && (
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
      )}
    </div>
  );
}
