// backend/routes/jobRoutes.js
const express = require("express");
const Job = require("../models/Job");
const db = require("../firebaseAdmin"); // Firebase Admin setup
// const Worker = require("../models/Worker");
const User = require("../models/User");
const router = express.Router();

router.get("/test-firebase", async (req, res) => {
  try {
    const testRef = db.ref("test");
    await testRef.set({
      testField: "This is a test",
      timestamp: Date.now(),
    });
    res
      .status(200)
      .json({ message: "Data written to Firebase Realtime Database" });
  } catch (error) {
    res.status(500).json({ message: "Error writing to Firebase", error });
  }
});

// Post a new job
router.post("/add-job", async (req, res) => {
  const { customer, workerType, dateRange, workDetails } = req.body;

  try {
    // Save the job to MongoDB
    const newJob = new Job({ customer, workerType, dateRange, workDetails });
    await newJob.save();
    console.log("Job saved to MongoDB:", newJob);

    // Save the job to Firebase Realtime Database for notifications
    const jobRef = db.ref("jobs").push();
    await jobRef.set({
      jobId: newJob._id.toString(), // Reference MongoDB job ID
      customer,
      workerType,
      dateRange,
      workDetails,
      status: "Pending",
    });
    console.log("Job saved to Firebase Realtime Database");

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Error posting job", error });
  }
});

// router.post("/accept-job", async (req, res) => {
//   const { jobId, workerId } = req.body; // Make sure workerId is a valid MongoDB ObjectId

//   try {
//     console.log("Worker ID received:", workerId); // Log the worker ID for debugging

//     // Fetch worker details from MongoDB using the ObjectId
//     const worker = await User.findById(workerId); // MongoDB query based on workerId
//     if (!worker) {
//       console.log("Worker not found in MongoDB");
//       return res.status(404).json({ message: "Worker not found" });
//     }

//     console.log("Worker details:", worker); // Log the worker details for debugging

//     // Update the job status in MongoDB
//     const job = await Job.findById(jobId);
//     if (job.status === "Pending") {
//       job.status = "Assigned";
//       job.assignedWorker = workerId;
//       await job.save();

//       // Update Firebase job with the worker ID (only store worker ID)
//       const jobRef = db.ref("jobs").child(jobId);
//       await jobRef.update({
//         status: "Assigned",
//         assignedWorkerId: workerId, // Store worker ID in Firebase
//       });

//       res.status(200).json({ message: "Job assigned successfully" });
//     } else {
//       res.status(400).json({ message: "Job has already been taken" });
//     }
//   } catch (error) {
//     console.error("Error accepting job:", error); // Log the error details
//     res.status(500).json({ message: "Error accepting job", error });
//   }
// });

router.post("/accept-job", async (req, res) => {
  const { jobId, workerId } = req.body;

  try {
    // Update the job status in MongoDB
    const job = await Job.findById(jobId);
    if (job.status === "Pending") {
      job.status = "Assigned";
      job.assignedWorker = workerId;
      await job.save();

      // Update the job status in Firebase Realtime Database
      const jobRef = db.ref("jobs").orderByChild("jobId").equalTo(jobId);
      jobRef.once("value", (snapshot) => {
        if (snapshot.exists()) {
          const jobKey = Object.keys(snapshot.val())[0]; // Get the Firebase job key
          db.ref(`jobs/${jobKey}`).update({
            status: "Assigned",
            assignedWorkerId: workerId,
          });
        }
      });

      res.status(200).json({ message: "Job assigned successfully" });
    } else {
      res.status(400).json({ message: "Job has already been taken" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error accepting job", error });
  }
});

module.exports = router;

// backend/routes/jobRoutes.js
// const express = require("express");
// const Job = require("../models/Job");

// const router = express.Router();

// // Create a new job posting
// router.post("/add-job", async (req, res) => {
//   const { customer, workerType, dateRange, workDetails } = req.body;

//   try {
//     const newJob = new Job({ customer, workerType, dateRange, workDetails });
//     await newJob.save();
//     res.status(201).json({ message: "Job posted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error posting job", error });
//   }
// });

// module.exports = router;
