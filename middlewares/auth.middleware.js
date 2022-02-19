const { getUserID } = require("../helpers/auth.helper");

module.exports = (req, res, next) => {
  try {
    if (!getUserID(req)) {
      throw "Invalid User ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      success: false,
      error: new Error("authentication Error"),
    });
  }
};
