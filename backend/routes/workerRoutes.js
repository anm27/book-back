// backend/routes/workerRoutes.js
const express = require("express");
const User = require("../models/User");
// const Worker = require("../models/Worker");

const router = express.Router();

// Create a new worker profile
router.post("/update-worker-profile", async (req, res) => {
  const { userId, name, phone, email, type, availability, charges } = req.body;

  try {
    // Find the user by their MongoDB _id and update the worker's profile
    const updatedWorker = await User.findByIdAndUpdate(
      userId, // MongoDB _id of the user
      {
        $set: {
          name,
          phone,
          email,
          type, // e.g., Maid or Security Guard
          availability,
          charges,
        },
      },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedWorker) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Worker profile updated successfully",
      user: updatedWorker,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating worker profile", error });
  }

  // try {
  //   const newWorker = new Worker({
  //     name,
  //     phone,
  //     email,
  //     type,
  //     availability,
  //     charges,
  //   });
  //   await newWorker.save();
  //   res.status(201).json({ message: "Worker profile created successfully" });
  // } catch (error) {
  //   res.status(500).json({ message: "Error creating worker profile", error });
  // }
});

// Fetch worker details by workerId
router.get("/worker-details/:workerId", async (req, res) => {
  try {
    const worker = await User.findById(req.params.workerId); // Fetch worker from MongoDB
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json({ worker });
  } catch (error) {
    res.status(500).json({ message: "Error fetching worker details", error });
  }
});

// Route to fetch worker by email
router.get("/worker-by-email/:email", async (req, res) => {
  try {
    const worker = await User.findOne({ email: req.params.email });
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json({ worker });
  } catch (error) {
    res.status(500).json({ message: "Error fetching worker", error });
  }
});

module.exports = router;
