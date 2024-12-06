// backend/models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    contact: { type: String, required: true },
  },
  workerType: {
    type: String,
    enum: ["Maid", "Security Guard"],
    required: true,
  },
  dateRange: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  workDetails: { type: String, required: true },
  assignedWorker: { type: mongoose.Schema.Types.ObjectId, ref: "Worker" }, // Reference to assigned worker
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
