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
      <div className={styles.headerRow}>
        <h1>Upcoming Events</h1>
      </div>

      <div className={styles.grid}>
        {events.map((event) => (
          <div key={event.id} className={styles.card}>
            <h3 className={styles.cardTitle}>
              <Link to={`/events/${event.id}`}>{event.title}</Link>
            </h3>
            <p className={styles.meta}>{event.location}</p>
            <p className={styles.meta}>{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
