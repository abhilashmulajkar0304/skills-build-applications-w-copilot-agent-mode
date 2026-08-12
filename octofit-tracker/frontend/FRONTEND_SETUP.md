# OctoFit Tracker Frontend - React 19 + Vite

This is the presentation tier of the OctoFit Tracker multi-tier application.

## Features

- **React 19** with modern hooks and features
- **Vite** for fast development and builds
- **react-router-dom** for client-side navigation
- **Bootstrap 5** for responsive styling
- **Codespaces-aware** API routing
- **Localhost support** for local development

## Environment Configuration

### Required Environment Variables

Create a `.env.local` file in the frontend directory with the following variables:

```env
# GitHub Codespaces environment
# If running in Codespaces, set this to your Codespace name
VITE_CODESPACE_NAME=your-codespace-name

# Optional: Override the API base URL if needed
# VITE_API_BASE_URL=http://localhost:8000/api
```

### Setting VITE_CODESPACE_NAME

1. **In GitHub Codespaces**: The `CODESPACE_NAME` environment variable is automatically available. You can verify it:
   ```bash
   echo $CODESPACE_NAME
   ```
   Then set it in `.env.local`:
   ```env
   VITE_CODESPACE_NAME=cuddly-umbrella-xgwgqv44636qq9
   ```

2. **For Local Development**: Leave it empty or set to `localhost`:
   ```env
   VITE_CODESPACE_NAME=localhost
   ```
   The app will default to `http://localhost:8000/api`

## API Configuration

The `src/api.js` module provides utilities for API communication:

```javascript
import { getApiBaseUrl, fetchFromApi, postToApi } from './api.js';

// Get the configured API base URL
const baseUrl = getApiBaseUrl();
// Returns: https://{CODESPACE_NAME}-8000.app.github.dev/api (in Codespaces)
// Returns: http://localhost:8000/api (locally)

// Fetch data from API (handles both array and paginated responses)
const users = await fetchFromApi('/users');

// Post data to API
const newUser = await postToApi('/users', { username: 'john', email: 'john@example.com' });
```

## API Endpoints

The frontend connects to the backend API at:

| Environment | Base URL |
|---|---|
| **Codespaces** | `https://{CODESPACE_NAME}-8000.app.github.dev/api` |
| **Localhost** | `http://localhost:8000/api` |

### Available Routes

- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `GET /api/activities` - List activities
- `POST /api/activities` - Create activity
- `GET /api/teams` - List teams
- `POST /api/teams` - Create team
- `GET /api/leaderboard` - Get leaderboard rankings
- `GET /api/workouts` - Get personalized workouts
- `POST /api/workouts` - Create workout

## Components

### Pages (routes)

- **Home** (`/`) - Dashboard with navigation
- **Users** (`/users`) - List all users
- **Activities** (`/activities`) - List all activities
- **Teams** (`/teams`) - Browse teams
- **Leaderboard** (`/leaderboard`) - View rankings
- **Workouts** (`/workouts`) - View personalized workouts

### API Client

- **src/api.js** - Centralized API utilities
  - `getApiBaseUrl()` - Get configured API base URL
  - `fetchFromApi(endpoint)` - Fetch data from API
  - `postToApi(endpoint, data)` - Post data to API

## Response Handling

The `fetchFromApi()` function handles multiple response formats:

1. **Array responses** - Returns directly:
   ```json
   [{ id: 1, name: "User 1" }, { id: 2, name: "User 2" }]
   ```

2. **Paginated responses** - Extracts items array:
   ```json
   { "items": [...], "total": 2, "page": 1 }
   ```

3. **Single object responses** - Wraps in array:
   ```json
   { "id": 1, "name": "User 1" } → [{ "id": 1, "name": "User 1" }]
   ```

## Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The app will start on `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## Bootstrap Classes Used

The app uses Bootstrap 5 utility classes for styling:

- Navigation: `navbar`, `navbar-dark`, `bg-dark`
- Layout: `container`, `container-fluid`, `row`, `col-md-6`
- Cards: `card`, `card-body`, `card-title`, `card-text`
- Tables: `table`, `table-striped`, `table-hover`
- Alerts: `alert`, `alert-danger`, `alert-warning`
- Buttons: `btn`, `btn-primary`
- Text: `text-muted`, `text-warning`, `display-4`, `lead`
- Spacing: `mt-5`, `mb-4`, `py-4`

## Troubleshooting

### API calls return `https://undefined-8000...`

**Solution**: Set `VITE_CODESPACE_NAME` in `.env.local` or ensure you're using localhost with the correct backend URL.

### CORS errors

**Solution**: The backend has CORS enabled. Make sure:
1. Backend is running on port 8000
2. Frontend is using the correct API base URL
3. Both are on the same network (Codespaces or localhost)

### Components not loading data

**Solution**: Check browser console for errors and verify:
1. Backend API is running
2. `VITE_CODESPACE_NAME` is configured correctly
3. API endpoints exist on the backend

## Architecture

```
frontend/
├── src/
│   ├── api.js                 # API utilities
│   ├── App.jsx                # Main router component
│   ├── main.jsx               # Entry point
│   ├── index.css              # Global styles
│   ├── App.css                # App-specific styles
│   ├── components/
│   │   ├── Users.jsx          # Users list page
│   │   ├── Activities.jsx     # Activities list page
│   │   ├── Teams.jsx          # Teams list page
│   │   ├── Leaderboard.jsx    # Leaderboard page
│   │   └── Workouts.jsx       # Workouts page
│   └── assets/                # Images and static files
├── .env.local                 # Environment variables (local)
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies and scripts
└── index.html                 # HTML template
```

## See Also

- [React 19 Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [react-router-dom Documentation](https://reactrouter.com)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0)
