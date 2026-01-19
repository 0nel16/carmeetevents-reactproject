import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";

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
    <div>
      <h1>Edit Event</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} />
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <input name="location" value={form.location} onChange={handleChange} />

        <textarea name="description" value={form.description} onChange={handleChange} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}