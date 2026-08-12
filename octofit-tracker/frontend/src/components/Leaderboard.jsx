import { useEffect, useState } from 'react';
import { fetchFromApi } from '../api.js';

// API Endpoint: https://<codespace-name>-8000.app.github.dev/api/leaderboard
const API_ENDPOINT = '/api/leaderboard/';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        const data = await fetchFromApi('/api/leaderboard/');
        setLeaderboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) return <div className="container"><p>Loading leaderboard...</p></div>;
  if (error) return <div className="container alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Leaderboard</h1>
      {leaderboard.length === 0 ? (
        <p>No leaderboard data found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry._id || entry.id}>
                  <td>
                    <strong>#{index + 1}</strong>
                  </td>
                  <td>{entry.user?.username || entry.username || 'Unknown'}</td>
                  <td>{entry.score || 0}</td>
                  <td>{entry.activityCount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
