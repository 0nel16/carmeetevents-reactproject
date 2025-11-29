import { useState } from 'react';
import { toast } from 'react-toastify';
import { email, flattenError, object, string } from 'zod';

const apiUrl = import.meta.env.VITE_API_URL + '/register';

const registerSchema = object({
  email: email('Please type a valid email address'),
  password: string().min(
    6,
    'Your password needs to be at least 6 characters long'
  ),
  retypePassword: string(),
  firstName: string().min(1, 'Please tell us your first name'),
  lastName: string().min(1, 'Please tell us your last name'),
}).refine((data) => data.password === data.retypePassword, {
  message: 'The passwords did not match',
  path: ['retypePassword'],
});

function validateForm(formValues, schema) {
  const res = schema.safeParse(formValues);
  if (res.success !== false) {
    return null;
  }

  const err = flattenError(res.error);
  const errors = Object.fromEntries(
    Object.entries(err.fieldErrors).map(([key, val]) => [key, val[0]])
  );

  return errors;
}

export function Register() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    retypePassword: '',
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = useState(null);
  const { login } = useAuthContext();

  function handleInputChange(e) {
    // const newValues = {...formValues};
    // const fieldName = e.target.name;
    // newValues[fieldName] = e.target.value;
    // setFormValues(newValues);

    const newValues = { ...formValues, [e.target.name]: e.target.value };
    if (errors) {
      // daca exista erori in formular doar atunci rulam iar validarea cand se apasa o tasta
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
      <h1 className="fullWidth">Register</h1>

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

      <label htmlFor="retypePassword">Retype Password</label>
      <input
        name="retypePassword"
        id="retypePassword"
        type="password"
        value={formValues.retypePassword}
        onChange={handleInputChange}
        placeholder="Retype Password"
      />
      {errors?.retypePassword && (
        <p className="errorMessage secondColumn">{errors.retypePassword}</p>
      )}

      <label htmlFor="firstName">First Name</label>
      <input
        name="firstName"
        id="firstName"
        type="text"
        value={formValues.firstName}
        onChange={handleInputChange}
        placeholder="First Name"
      />
      {errors?.firstName && (
        <p className="errorMessage secondColumn">{errors.firstName}</p>
      )}

      <label htmlFor="lastName">Last Name</label>
      <input
        name="lastName"
        id="lastName"
        type="text"
        value={formValues.lastName}
        onChange={handleInputChange}
        placeholder="Last Name"
      />
      {errors?.lastName && (
        <p className="errorMessage secondColumn">{errors.lastName}</p>
      )}

      <button type="submit" className="secondColumn autoWidth">
        Register
      </button>
    </form>
  );
}
