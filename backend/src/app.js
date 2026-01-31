const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// ROUTE IMPORTS
const authRoutes = require("./routes/authRoutes");
const progressRoutes = require("./routes/progressRoutes");

dotenv.config();

const app = express(); // ✅ app CREATED FIRST

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Fitness Wallah Backend Running");
});

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
