// backend/routes/workRoutes.js
const express = require('express');
const Work = require('../models/Work');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = 'your_secret_key';

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Add Work
router.post('/', authenticateToken, async (req, res) => {
  const { workName, workDescription, department, type } = req.body;

  try {
    const newWork = new Work({
      workName,
      workDescription,
      department,
      type,
      userId: req.user.id,
    });
    await newWork.save();
    res.status(201).json({ message: 'Work added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add work', error });
  }
});

// Get all works for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const works = await Work.find({ userId: req.user.id });
    res.json(works);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve works', error });
  }
});

// Delete a work item
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const work = await Work.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!work) return res.status(404).json({ message: 'Work not found' });

    res.json({ message: 'Work deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete work', error });
  }
});

module.exports = router;
