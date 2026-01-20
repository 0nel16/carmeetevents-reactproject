import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { useAuthContext } from "../Auth/AuthContext";
import toast from "react-hot-toast";

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
      .catch(() => toast.error("Could not load event details", { id: "event-details-load" }));
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
    <div>
      <h1>{event.title}</h1>
      <p>{event.location}</p>
      <p>{event.date}</p>
      <p>{event.description}</p>

      {isOwner && (
        <>
          <p>
            <Link to={`/events/${event.id}/edit`}>Edit</Link>
          </p>

          <button type="button" onClick={() => setShowConfirm(true)}>
            Delete
          </button>

          {showConfirm && (
            <ConfirmModal
              title="Delete event?"
              message="This action cannot be undone."
              onCancel={() => setShowConfirm(false)}
              onConfirm={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
}
