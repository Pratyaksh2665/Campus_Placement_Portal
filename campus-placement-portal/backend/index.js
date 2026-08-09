require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 2500;

connectDB();

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profile", profileRoutes);

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/job", jobRoutes);

const companyRoutes = require("./routes/companyRoutes");
app.use("/api/company", companyRoutes);

const searchJobsRoutes = require("./routes/searchJobsRoutes");
app.use("/api/search", searchJobsRoutes);

const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api/notifications", notificationRoutes);

const savedJobRoutes = require("./routes/savedJobRoutes");
app.use("/api/saved-jobs", savedJobRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Campus Placement Portal API Running",
  });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
