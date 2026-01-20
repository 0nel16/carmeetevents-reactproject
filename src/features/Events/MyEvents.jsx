import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";
import styles from "./Events.module.css"

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

      {events.length === 0 && <p>No events yet.</p>}

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