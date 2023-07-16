import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      // reset form
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]);
      console.log('new workout added', json);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label htmlFor="title">Exercise Title:</label>
      <input
        className={emptyFields.includes('title') ? 'error' : ''}
        type="text"
        id="title"
        name="load"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor="load">Load (in kg):</label>
      <input
        className={emptyFields.includes('load') ? 'error' : ''}
        type="number"
        id="load"
        name="load"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label htmlFor="reps">Reps:</label>
      <input
        className={emptyFields.includes('reps') ? 'error' : ''}
        type="number"
        id="reps"
        name="reps"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
