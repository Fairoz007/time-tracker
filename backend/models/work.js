// backend/models/Work.js

const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  workName: { type: String, required: true },
  workDescription: { type: String, required: true },
  department: { type: String, required: true },
  type: { type: String, required: true },
  startTime: { type: Number, default: 0 },
  elapsedTime: { type: Number, default: 0 },
  // You can add a reference to the user if needed
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Work', workSchema);
