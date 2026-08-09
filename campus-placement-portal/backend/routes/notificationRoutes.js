const express = require("express");
const router = express.Router();

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

const {
  checkForAuthenticationCookie,
} = require("../middleware/authMiddleware");

router.use(checkForAuthenticationCookie("token"));

router.get("/", getNotifications);

router.put("/:id/read", markAsRead);

router.put("/read-all", markAllAsRead);

router.delete("/:id", deleteNotification);

module.exports = router;
