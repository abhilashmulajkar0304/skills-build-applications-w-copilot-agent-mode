import { useEffect, useState } from 'react';
import { fetchFromApi } from '../api.js';

// API Endpoint: https://<codespace-name>-8000.app.github.dev/api/users
const API_ENDPOINT = '/api/users/';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const data = await fetchFromApi('/api/users/');
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) return <div className="container"><p>Loading users...</p></div>;
  if (error) return <div className="container alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.team ? user.team.name : 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
