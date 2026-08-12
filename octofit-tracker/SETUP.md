# OctoFit Tracker - Project Setup Guide

## ✓ Initialization Complete

The OctoFit Tracker multi-tier application has been successfully initialized with the following configuration:

### Project Structure
```
octofit-tracker/
├── backend/               # Express + TypeScript backend
│   ├── src/
│   │   ├── index.ts      # Main Express server
│   │   ├── config/
│   │   │   └── database.ts    # MongoDB connection
│   │   └── scripts/
│   ├── dist/             # Compiled JavaScript output
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env              # Environment configuration
│   └── .gitignore
│
└── frontend/              # React 19 + Vite frontend
    ├── src/
    │   ├── main.jsx      # Entry point
    │   ├── App.jsx
    │   └── ...other React files
    ├── public/
    ├── package.json
    ├── vite.config.js
    ├── .env              # Frontend environment config
    └── .gitignore
```

---

## 🖥️ Frontend Configuration

**Framework:** React 19  
**Build Tool:** Vite  
**Port:** 5173 (configurable in vite.config.js)

### Frontend Dependencies
- `react@^19.2.8`
- `react-dom@^19.2.8`

### Frontend Dev Dependencies
- `@vitejs/plugin-react@^6.0.4`
- `vite@^8.2.0`
- `oxlint@^1.75.0` (Linting)
- TypeScript types for React

### Frontend Commands
```bash
cd frontend
npm run dev        # Start development server (http://localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run linter
```

### Frontend Environment (.env)
```
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🚀 Backend Configuration

**Runtime:** Node.js  
**Framework:** Express 5  
**Language:** TypeScript  
**Database:** MongoDB (Mongoose)  
**Port:** 8000 (configurable via .env)

### Backend Dependencies
- `express@^5.2.1` - Web framework
- `mongoose@^9.9.2` - MongoDB object modeling
- `dotenv@^17.4.2` - Environment variables
- `cors@^2.8.6` - Cross-Origin Resource Sharing

### Backend Dev Dependencies
- `typescript@^7.0.2`
- `ts-node@^10.9.2`
- `@types/node`, `@types/express`, `@types/cors` - TypeScript definitions

### Backend Scripts
```bash
cd backend
npm run dev        # Start development server with ts-node (http://localhost:8000)
npm run build      # Compile TypeScript to JavaScript
npm run start      # Run compiled JavaScript from dist/
```

### Backend Environment (.env)
```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
NODE_ENV=development
```

---

## 🗄️ Database Configuration

**Type:** MongoDB  
**Default Connection:** `mongodb://localhost:27017/octofit-tracker`  
**Port:** 27017

### Database Setup
The backend connects to MongoDB using Mongoose. Ensure MongoDB is running before starting the backend:

```bash
# If using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or if MongoDB is installed locally
mongod
```

### Database Connection File
- Located at: `backend/src/config/database.ts`
- Handles connection initialization and error handling
- Can be customized via `MONGODB_URI` environment variable

---

## 🔌 API Endpoints (Starting Points)

### Health Check
```
GET http://localhost:8000/api/health
Response: { status: 'OK', message: 'OctoFit Tracker Backend is running' }
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or containerized)

### Running the Full Application

**Terminal 1 - Backend:**
```bash
cd octofit-tracker/backend
npm install
npm run dev
# Backend running at http://localhost:8000
```

**Terminal 2 - MongoDB (if not running):**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
# Or use local MongoDB installation
```

**Terminal 3 - Frontend:**
```bash
cd octofit-tracker/frontend
npm install
npm run dev
# Frontend running at http://localhost:5173
```

---

## 📝 Project Configuration Files

### Backend TypeScript Configuration (tsconfig.json)
- Target: ES2020
- Module: ES2020 (ESM)
- Strict mode enabled
- Source maps included for debugging
- Output directory: `dist/`

### Frontend Vite Configuration (vite.config.js)
- React plugin enabled
- Development server on port 5173
- HMR (Hot Module Replacement) for fast development

---

## 🔧 Development Workflow

1. **Start MongoDB:**
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access Application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - Health Check: http://localhost:8000/api/health

---

## 🛠️ Building for Production

### Backend
```bash
cd backend
npm run build    # Compiles TypeScript to dist/
npm run start    # Runs the compiled JavaScript
```

### Frontend
```bash
cd frontend
npm run build    # Creates optimized production build
npm run preview  # Preview production build locally
```

---

## 📚 Next Steps

1. **Create API Routes:** Add route handlers in `backend/src/routes/`
2. **Create Mongoose Models:** Define data models in `backend/src/models/`
3. **Build UI Components:** Create React components in `frontend/src/components/`
4. **Add State Management:** Consider Redux, Zustand, or Context API for state
5. **API Integration:** Connect frontend components to backend API endpoints

---

## ✅ Port Summary

| Service | Port | URL |
|---------|------|-----|
| Frontend (Vite) | 5173 | http://localhost:5173 |
| Backend (Express) | 8000 | http://localhost:8000 |
| MongoDB | 27017 | mongodb://localhost:27017 |

---

## 🎯 Technology Stack Summary

- **Frontend:** React 19 + Vite + TypeScript
- **Backend:** Express 5 + TypeScript + ts-node
- **Database:** MongoDB + Mongoose
- **Package Manager:** npm
- **Language:** JavaScript/TypeScript (ES2020+)
- **Environment:** Node.js 18+
