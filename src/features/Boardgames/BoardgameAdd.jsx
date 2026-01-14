import { useState } from 'react';
import { coerce, object, string, url } from 'zod';
import { validateForm } from '../../utils';
import { useAuthContext } from '../Auth/AuthContext';
import { useNavigate } from 'react-router';

const endpoint = `${import.meta.env.VITE_API_URL}/boardgames`;

const validationSchema = object({
  name: string().min(1, 'Please enter a name for the game'),
  description: string().min(
    10,
    'The description should be at least 10 characters long'
  ),
  minAge: coerce.number().positive(),
  thumbnail: url('Please enter a valid url'),
  image: url('Please enter a valid url'),
  numberOfPlayers: object({
    min: coerce.number().min(1, 'The number of players needs to be at least 1'),
    max: coerce.number().min(1, 'The number of players needs to be at least 1'),
    recommended: coerce
      .number()
      .min(1, 'The number of players needs to be at least 1'),
    best: coerce
      .number()
      .min(1, 'The number of players needs to be at least 1'),
  }),
});

const ages = [];

for (let i = 1; i <= 18; i++) {
  ages.push(i);
}

ages[ages.length - 1] += '+';

export function BoardgameAdd() {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    minAge: '1',
    thumbnail: '',
    image: '',
    numberOfPlayers: {
      min: '',
      max: '',
      recommended: '',
      best: '',
    },
  });
  const [errors, setErrors] = useState(null);
  const { accessToken, user } = useAuthContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const errors = validateForm(formValues, validationSchema);

    if (errors) {
      setErrors(errors);
      return;
    }

    const send2Server = {...formValues, userId: user.id};

    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(send2Server),
    });

    navigate('/boardgames');
  }

  function handleInputChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function handleNumberOfPlayersChange(e) {
    setFormValues({
      ...formValues,
      numberOfPlayers: {
        ...formValues.numberOfPlayers,
        [e.target.name]: e.target.value,
      },
    });
  }

  return (
    <form className="brandForm" onSubmit={handleSubmit}>
      <h1 className="fullWidth">Add a New Boardgame</h1>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={formValues.name}
        onChange={handleInputChange}
      />
      {errors?.name && (
        <p className="errorMessage secondColumn">{errors.name}</p>
      )}

      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        value={formValues.description}
        onChange={handleInputChange}
      ></textarea>
      {errors?.description && (
        <p className="errorMessage secondColumn">{errors.description}</p>
      )}

      <label htmlFor="minAge">Minimum Age</label>
      <select
        name="minAge"
        id="minAge"
        value={formValues.minAge}
        onChange={handleInputChange}
      >
        {ages.map((age) => (
          <option value={age} key={age}>
            {age}
          </option>
        ))}
      </select>
      {errors?.minAge && (
        <p className="errorMessage secondColumn">{errors.minAge}</p>
      )}

      <label htmlFor="thumbnail">Thumbnail</label>
      <input
        type="url"
        name="thumbnail"
        id="thumbnail"
        value={formValues.thumbnail}
        onChange={handleInputChange}
      />
      {errors?.thumbnail && (
        <p className="errorMessage secondColumn">{errors.thumbnail}</p>
      )}

      <label htmlFor="image">Image</label>
      <input
        type="url"
        name="image"
        id="image"
        value={formValues.image}
        onChange={handleInputChange}
      />
      {errors?.image && (
        <p className="errorMessage secondColumn">{errors.image}</p>
      )}

      <span>Number of Players</span>
      <div>
        <label htmlFor="min">Min</label>
        <input
          type="number"
          name="min"
          id="min"
          value={formValues.numberOfPlayers.min}
          onChange={handleNumberOfPlayersChange}
        />
        {errors?.numberOfPlayers?.min && (
          <p className="errorMessage secondColumn">
            {errors.numberOfPlayers.min}
          </p>
        )}

        <label htmlFor="max">Max</label>
        <input
          type="number"
          name="max"
          id="max"
          value={formValues.numberOfPlayers.max}
          onChange={handleNumberOfPlayersChange}
        />
        {errors?.numberOfPlayers?.max && (
          <p className="errorMessage secondColumn">
            {errors.numberOfPlayers.max}
          </p>
        )}

        <label htmlFor="recommended">Recommended</label>
        <input
          type="number"
          name="recommended"
          id="recommended"
          value={formValues.numberOfPlayers.recommended}
          onChange={handleNumberOfPlayersChange}
        />
        {errors?.numberOfPlayers?.recommended && (
          <p className="errorMessage secondColumn">
            {errors.numberOfPlayers.recommended}
          </p>
        )}

        <label htmlFor="best">Best</label>
        <input
          type="number"
          name="best"
          id="best"
          value={formValues.numberOfPlayers.best}
          onChange={handleNumberOfPlayersChange}
        />
        {errors?.numberOfPlayers?.best && (
          <p className="errorMessage secondColumn">
            {errors.numberOfPlayers.best}
          </p>
        )}
      </div>

      <button type="submit" className="secondColumn autoWidth">
        Add Boardgame
      </button>
    </form>
  );
}
