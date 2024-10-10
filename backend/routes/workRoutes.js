// routes/workRoutes.js

const express = require('express');
const router = express.Router();
const Work = require('../models/Work'); // Assuming you have a Work model defined

// Route to add new work
router.post('/', async (req, res) => {
  const { workName, workDescription, department, type } = req.body;

  try {
    // Validate the required fields
    if (!workName || !workDescription || !department || !type) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Create a new Work instance
    const newWork = new Work({
      workName,
      workDescription,
      department,
      type,
    });

    // Save the work to the database
    await newWork.save();

    // Send success response
    return res.status(200).json({ success: true, message: 'Work added successfully' });
  } catch (error) {
    console.error('Error adding work:', error);
    return res.status(500).json({ success: false, message: 'Failed to add work. Please try again.' });
  }
});

module.exports = router;
