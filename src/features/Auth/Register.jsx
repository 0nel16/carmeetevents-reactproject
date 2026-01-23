import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { email, object, string } from "zod";
import { useAuthContext } from "./AuthContext";
import { useLocation, useNavigate } from "react-router";
import { validateForm } from "../../utils";
import styles from "./Auth.module.css"

const apiUrl = import.meta.env.VITE_API_URL + "/register";

const registerSchema = object({
  email: email("Please type a valid email address"),
  password: string().min(
    6,
    "Your password needs to be at least 6 characters long",
  ),
  retypePassword: string(),
  firstName: string().min(1, "Please tell us your first name"),
  lastName: string().min(1, "Please tell us your last name"),
}).refine((data) => data.password === data.retypePassword, {
  message: "The passwords did not match",
  path: ["retypePassword"],
});

export function Register() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    retypePassword: "",
    firstName: "",
    lastName: "",
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
      const newErrors = validateForm(newValues, registerSchema);
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

    const errors = validateForm(formValues, registerSchema);

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
        <h1>Register</h1>
        <form className="brandForm" noValidate onSubmit={handleSubmit}>
          <div className={styles.authField}>
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="email" value={formValues.email} onChange={handleInputChange} />
            {errors?.email && <p className="errorMessage">{errors.email}</p>}
          </div>
          <div className={styles.authField}>
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" value={formValues.password} onChange={handleInputChange} />
            {errors?.password && <p className="errorMessage">{errors.password}</p>}
          </div>
          <div className={styles.authField}>
            <label htmlFor="retypePassword">Retype Password</label>
            <input name="retypePassword" id="retypePassword" type="password" value={formValues.retypePassword} onChange={handleInputChange} />
            {errors?.retypePassword && <p className="errorMessage">{errors.retypePassword}</p>}
          </div>
          <div className={styles.authField}>
            <label htmlFor="firstName">First Name</label>
            <input name="firstName" id="firstName" type="text" value={formValues.firstName} onChange={handleInputChange} />
            {errors?.firstName && <p className="errorMessage">{errors.firstName}</p>}
          </div>
          <div className={styles.authField}>
            <label htmlFor="lastName">Last Name</label>
            <input name="lastName" id="lastName" type="text" value={formValues.lastName} onChange={handleInputChange} />
            {errors?.lastName && <p className="errorMessage">{errors.lastName}</p>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
