// backend/models/Worker.js
const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, enum: ["Maid", "Security Guard"], required: true },
  availability: { type: String, required: true },
  charges: {
    oneDay: { type: Number, required: true },
    multipleDays: { type: Number, required: true },
    monthly: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Worker", workerSchema);
