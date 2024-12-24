export const isAdminCheck = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        msg: "Unauthorized: Admins only Access!",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
