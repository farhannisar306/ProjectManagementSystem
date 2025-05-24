import express from 'express';
import { base_url, port } from './config/config';
const app = express();
const PORT = port;

// Middleware (optional)
app.use(express.json());

// Route
app.get('/', (req, res) => {
  res.send('Hello from Express');
});

app.get('/api/v1/create_user', (req, res) => {
  res.json({
    message: {
      firstname: 'Farhan',
      lastname: 'Nisar',
      email: 'farhannisar306@gmail.com',
    },
    status: 'success'
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running ${base_url}:${PORT}`);
});
