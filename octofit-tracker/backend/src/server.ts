import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database.js';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const baseUrl = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker Backend is running', baseUrl });
});

app.use('/api', apiRouter);

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`✓ Backend server running on http://localhost:${PORT}`);
      console.log(`✓ API base URL: ${baseUrl}`);
      console.log(`✓ API health check: ${baseUrl}/api/health`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
