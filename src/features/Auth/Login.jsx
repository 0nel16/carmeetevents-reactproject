import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { email, object, string } from 'zod';
import { useAuthContext } from './AuthContext';
import { useLocation, useNavigate } from 'react-router';
import { validateForm } from '../../utils';

const apiUrl = import.meta.env.VITE_API_URL + '/login';

const loginSchema = object({
  email: email('Please type a valid email address'),
  password: string().min(
    6,
    'Your password needs to be at least 6 characters long'
  ),
});

export function Login() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState(null);

  const { user, login } = useAuthContext();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if(user) {
      const from = state?.from || '/';
      navigate(from);
    }
  }, [user, state, navigate])

  function handleInputChange(e) {
    // const newValues = {...formValues};
    // const fieldName = e.target.name;
    // newValues[fieldName] = e.target.value;
    // setFormValues(newValues);

    const newValues = { ...formValues, [e.target.name]: e.target.value };
    if (errors) {
      // daca exista erori in formular doar atunci rulam iar validarea cand se apasa o tasta
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

    const send2Server = {...formValues};
    delete send2Server.retypePassword;

    const res = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(send2Server),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => res.json());

    if(typeof res === 'string') {
      toast.error(res);
      return;
    }

    toast.success('You have been successfully logged in!');
    login(res);
  }

  return (
    <form className="brandForm" noValidate onSubmit={handleSubmit}>
      <h1 className="fullWidth">Login</h1>

      <label htmlFor="email">Email</label>
      <input
        name="email"
        id="email"
        type="email"
        value={formValues.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      {errors?.email && (
        <p className="errorMessage secondColumn">{errors.email}</p>
      )}

      <label htmlFor="password">Password</label>
      <input
        name="password"
        id="password"
        type="password"
        value={formValues.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      {errors?.password && (
        <p className="errorMessage secondColumn">{errors.password}</p>
      )}

      <button type="submit" className="secondColumn autoWidth">
        Login
      </button>
    </form>
  );
}
