function authorizeRoles(...roles) {
  return function (req, res, next) {
    console.log("Allowed Roles:", roles);
    console.log("Logged In User:", req.user);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    next();
  };
}
module.exports = { authorizeRoles };
