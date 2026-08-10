require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const jobRoutes = require("./routes/jobRoutes");
const companyRoutes = require("./routes/companyRoutes");
const searchJobsRoutes = require("./routes/searchJobsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/search", searchJobsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/saved-jobs", savedJobRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Campus Placement Portal API Running ",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
