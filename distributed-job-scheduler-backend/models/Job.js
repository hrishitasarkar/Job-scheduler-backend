
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  name: String,
  schedule: String,
  command: String,
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  dependencies: [String],
  retry: { type: Number, default: 0 },
  status: { type: String, default: 'Scheduled' },
  nextRun: Date
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
