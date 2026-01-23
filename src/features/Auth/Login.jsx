import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { email, object, string } from "zod";
import { useAuthContext } from "./AuthContext";
import { useLocation, useNavigate } from "react-router";
import { validateForm } from "../../utils";
import styles from "./Auth.module.css"


const apiUrl = import.meta.env.VITE_API_URL + "/login";

const loginSchema = object({
  email: email("Please type a valid email address"),
  password: string().min(
    6,
    "Your password needs to be at least 6 characters long",
  ),
});

export function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  const { user, login } = useAuthContext();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (user) {
      const from = state?.from || "/";
      navigate(from);
    }
  }, [user, state, navigate]);

  function handleInputChange(e) {
    const newValues = { ...formValues, [e.target.name]: e.target.value };
    if (errors) {
      const newErrors = validateForm(newValues, loginSchema);
      if (newErrors) {
        setErrors(newErrors);
      } else {
        setErrors(null);
      }
    }
    setFormValues(newValues);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errors = validateForm(formValues, loginSchema);

    if (errors) {
      setErrors(errors);
      return;
    }

    setErrors(null);

    const send2Server = { ...formValues };
    delete send2Server.retypePassword;

    const res = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(send2Server),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (typeof res === "string") {
      toast.error(res);
      return;
    }

    toast.success("You have been successfully logged in!");
    login(res);
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>Login</h1>
        <form className="brandForm" noValidate onSubmit={handleSubmit}>
          <div className={styles.authField}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            {errors?.email && <p className="errorMessage">{errors.email}</p>}
          </div>

          <div className={styles.authField}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              value={formValues.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            {errors?.password && <p className="errorMessage">{errors.password}</p>}
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
