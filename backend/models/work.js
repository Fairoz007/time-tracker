// backend/models/Work.js
const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  workName: { type: String, required: true },
  workDescription: { type: String, required: true },
  department: { type: String, required: true },
  type: { type: String, enum: ['Client', 'Internal', 'Other'], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Work', workSchema);
