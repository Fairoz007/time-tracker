const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const workRoutes = require('./routes/workRoutes'); // Import work routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // This is important to parse JSON bodies

// Routes
app.use('/api/works', workRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/time-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
