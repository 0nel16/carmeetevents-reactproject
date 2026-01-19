import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";

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
    <div>
      <h1>My Events</h1>

      {events.length === 0 && <p>No events yet.</p>}

      {events.map((event) => (
        <div key={event.id}>
          <h3>
            <Link to={`/events/${event.id}`}>{event.title}</Link>
          </h3>
          <p>{event.location}</p>
          <p>{event.date}</p>
        </div>
      ))}
    </div>
  );
}