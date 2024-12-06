const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const workerRoutes = require("./routes/workerRoutes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(jobRoutes);
app.use(authRoutes);
app.use(workerRoutes);

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://anmishra20:LzTOB8eApbXvIqx8@cluster0.k86ipkh.mongodb.net/maid-security",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Simple Route for testing
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
