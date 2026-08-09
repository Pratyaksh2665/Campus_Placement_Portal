const { verifyToken } = require("../utils/auth");
function checkForAuthenticationCookie(cookieName) {
  return function (req, res, next) {
    // Read token from cookie
    const token = req.cookies[cookieName];

    // If no token is present
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    try {
      // Verify JWT
      const decoded = verifyToken(token);

      // Store decoded payload in req.user
      req.user = decoded;

      // Continue to next middleware/controller
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or Expired Token",
      });
    }
  };
}

module.exports = { checkForAuthenticationCookie };
