import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import styles from "./Auth.module.css";

const Profile = () => {
  const { user, setUser } = useAuthContext();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Password change simulated (backend limitation)");

    setFormData((prev) => ({
      ...prev,
      password: "",
      confirmPassword: "",
    }));
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled
          />
          <input
            type="password"
            name="password"
            placeholder="New password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit">Save changes</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
