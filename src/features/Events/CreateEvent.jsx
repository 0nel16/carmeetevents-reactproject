import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { user, accessToken } = useAuthContext();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("meet");
  const [price, setPrice] = useState(0);
  const [capacity, setCapacity] = useState(10);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !date || !location || !description) return;

    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title,
        date,
        location,
        category,
        price: Number(price),
        capacity: Number(capacity),
        description,
        imageUrl,
        isPublic,
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
    <div>
      <h1>Add Event</h1>

      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="meet">Meet</option>
          <option value="trackday">Trackday</option>
          <option value="cruise">Cruise</option>
          <option value="expo">Expo</option>
        </select>

        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" min="0" />
        <input value={capacity} onChange={(e) => setCapacity(e.target.value)} type="number" min="1" />

        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />

        <label>
          Public
          <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
        </label>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}