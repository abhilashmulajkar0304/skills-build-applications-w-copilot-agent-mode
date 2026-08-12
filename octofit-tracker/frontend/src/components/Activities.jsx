import { useEffect, useState } from 'react';
import { fetchFromApi } from '../api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true);
        const data = await fetchFromApi('/api/activities/');
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) return <div className="container"><p>Loading activities...</p></div>;
  if (error) return <div className="container alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Activities</h1>
      {activities.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Activity Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity.user?.username || 'Unknown'}</td>
                  <td>{activity.activityType}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.distance}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
