import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div>
      <h1>Upcoming Events</h1>

      {events.map(event => (
        <div key={event.id}>
          <h3><Link to={`/events/${event.id}`}>{event.title}</Link></h3>
          <p>{event.location}</p>
          <p>{event.date}</p>
        </div>
      ))}
    </div>
  );
}