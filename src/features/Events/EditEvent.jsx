import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";
import styles from "./CreateEvent.module.css";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, accessToken } = useAuthContext();

  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:3000/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        ...form,
        userId: user.id,
      }),
    }).then(() => navigate("/events"));
  }

  if (!form) return <p>Loading...</p>;

  return (
    <div className={styles.addEventPage}>
      <h1 className={styles.addEventTitle}>Edit Event</h1>
      <form className={styles.addEventForm} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Event title"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
          />
        </div>
        <textarea
          className={styles.description}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the event..."
        />
        <button className={styles.submitBtn} type="submit">
          Save changes
        </button>
      </form>
    </div>
  );
}