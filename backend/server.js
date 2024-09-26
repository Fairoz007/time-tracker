// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Adjust the path as necessary
const workRoutes = require('./routes/workRoutes'); // Import the workRoutes

const app = express();

// Middleware setup
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON requests

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/timeTracker', {
  serverSelectionTimeoutMS: 5000, // 5 seconds timeout
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Event listener for mongoose connection errors
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

// Event listener when mongoose successfully connects
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to the database');
});

// Register your routes
app.use('/api/users', userRoutes); // Make sure this matches the intended route prefix
app.use('/api/works', workRoutes); // Register the work routes

// Default route to check server status
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Global error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
