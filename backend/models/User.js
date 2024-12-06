// backend/models/User.js
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   role: { type: String, enum: ["customer", "worker"], required: true }, // User's role
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("User", userSchema);

// // backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String, // Ensure phone is part of the schema
  },
  type: {
    type: String, // e.g., Maid or Security Guard
  },
  availability: {
    type: String, // Worker availability
  },
  charges: {
    oneDay: {
      type: Number,
      default: 0,
    },
    multipleDays: {
      type: Number,
      default: 0,
    },
    monthly: {
      type: Number,
      default: 0,
    },
  },
  role: {
    type: String,
    enum: ["customer", "worker"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
