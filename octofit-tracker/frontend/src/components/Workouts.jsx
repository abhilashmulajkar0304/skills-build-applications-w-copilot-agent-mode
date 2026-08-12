import { useEffect, useState } from 'react';
import { fetchFromApi } from '../api.js';

// API Endpoint: https://<codespace-name>-8000.app.github.dev/api/workouts
const API_ENDPOINT = '/api/workouts/';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);
        const data = await fetchFromApi('/api/workouts/');
        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) return <div className="container"><p>Loading workouts...</p></div>;
  if (error) return <div className="container alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Personalized Workouts</h1>
      {workouts.length === 0 ? (
        <p>No workouts found</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Level: {workout.difficulty || 'Intermediate'}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Duration: {workout.duration} minutes
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
