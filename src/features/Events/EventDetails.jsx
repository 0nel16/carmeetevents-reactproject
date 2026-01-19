import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/events/${id}`)
        .then((res) => res.json())
        .then((data) => setEvent (data));
    }, [id]);

    if (!event) return <p>Loading...</p>;

    return (
        <div>
            <h1>{event.title}</h1>
            <p>{event.location}</p>
            <p>{event.date}</p>
            <p>{event.description}</p>
        </div>
    );
}