import express from 'express';
import { base_url, port } from './config/config';
import { PrismaClient } from '@prisma/client';
import apiRoutes from './RouteHQ';
import { ConnectToSQLDB } from './Application-Files/context/dbContext';

// Remove one of these:
const prisma = new PrismaClient(); // This isn't being used properly

const app = express();
const PORT = port;

// Middleware
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('Hello from Express');
});

// API Routes
app.use('/api/v1', apiRoutes);

// Connect to Prisma and start the server
const startServer = async () => {
  try {
    await ConnectToSQLDB();
    app.listen(PORT, () => {
      console.log(`Server running ${base_url}:${PORT}`);
    });
  } catch (err) {
    console.error('Server startup failed:', err);
    process.exit(1);
  }
};

startServer();

// Cleanup on app termination
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});


