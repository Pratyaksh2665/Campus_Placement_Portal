const express = require("express");

const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/loginController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

module.exports = router;
