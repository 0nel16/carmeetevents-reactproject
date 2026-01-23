import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";
import { LOCATIONS } from "../../data/locations";
import styles from "./CreateEvent.module.css";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { user, accessToken } = useAuthContext();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!title) newErrors.title = true;
    if (!date) newErrors.date = true;
    if (!category) newErrors.category = true;
    if (!location) newErrors.location = true;
    if (!description) newErrors.description = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const selectedLocation = LOCATIONS[category].find(
      (l) => l.value === location,
    );

    const imageUrl = selectedLocation?.imageUrl || "/images/default.jpg";

    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title,
        date,
        category,
        location,
        price: Number(price),
        capacity: Number(capacity),
        description,
        imageUrl,
        userId: user.id,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Create failed");
        return res.json();
      })
      .then(() => navigate("/events"));
  }

  return (
    <div className={styles.addEventPage}>
      <h1 className={styles.addEventTitle}></h1>
      <form className={styles.addEventForm} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <input
            className={errors.title ? styles.error : ""}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            className={errors.category ? styles.error : ""}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setLocation("");
            }}
          >
            <option value="">Select category</option>
            <option value="trackday">Trackday</option>
            <option value="expo">Expo</option>
            <option value="drift">Drift</option>
          </select>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={!category}
          >
            <option value="">Select location</option>
            {category &&
              LOCATIONS[category].map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
          </select>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (€)"
          />
          <input
            type="number"
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Capacity"
          />
        </div>
        <textarea
          className={`${styles.description} ${errors.description ? styles.error : ""}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the event..."
        />
        <button className={styles.submitBtn} type="submit">
          Create Event
        </button>
      </form>
    </div>
  );
}
