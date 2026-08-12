import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { getApiBaseUrl } from './api.js';
import Users from './components/Users.jsx';
import Activities from './components/Activities.jsx';
import Teams from './components/Teams.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

function Home() {
  const apiBaseUrl = getApiBaseUrl();
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">🏋️ OctoFit Tracker</h1>
        <p className="lead">Track your fitness activities and compete with teammates!</p>
        <hr className="my-4" />
        <p>
          <strong>API Base URL:</strong> <code>{apiBaseUrl}</code>
        </p>
        {codespaceName ? (
          <p>
            <strong>Codespace Name:</strong> <code>{codespaceName}</code>
          </p>
        ) : (
          <p className="text-warning">
            <strong>Note:</strong> Running on localhost. Set VITE_CODESPACE_NAME in .env.local for Codespaces support.
          </p>
        )}
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">📊 Activities</h5>
              <p className="card-text">View and log your fitness activities</p>
              <Link to="/activities" className="btn btn-primary">
                Browse Activities
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">👥 Users</h5>
              <p className="card-text">Explore community members</p>
              <Link to="/users" className="btn btn-primary">
                Browse Users
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">🏆 Leaderboard</h5>
              <p className="card-text">Check your ranking</p>
              <Link to="/leaderboard" className="btn btn-primary">
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">👨‍👩‍👦‍👦 Teams</h5>
              <p className="card-text">Join or create teams</p>
              <Link to="/teams" className="btn btn-primary">
                Browse Teams
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">💪 Workouts</h5>
              <p className="card-text">Get personalized workout suggestions</p>
              <Link to="/workouts" className="btn btn-primary">
                View Workouts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              🏋️ OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        <footer className="bg-light py-4 mt-5">
          <div className="container text-center">
            <p className="text-muted">
              OctoFit Tracker &copy; 2024 | Built with React 19 + Vite + Bootstrap
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
