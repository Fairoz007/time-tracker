// backend/routes/userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const User = require('../models/User'); // Ensure this path is correct
const router = express.Router();

// Load environment variables from the .env file
require('dotenv').config();

// Secret key for JWT - make sure this is stored in your environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use environment variable for security

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user instance with hashed password (the hashing is handled by the schema pre-save middleware)
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error during signup', error: error.message || error });
  }
});

// Login Route with JWT
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Use the comparePassword method defined in the user model for password comparison
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send the token and user details in the response
    res.json({ message: 'Login successful', token, user: { email: user.email, username: user.username } });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message || error });
  }
});

module.exports = router;
