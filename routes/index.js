const express = require("express");
const router = express.Router();
const authController = require("../controllers/user.controller");

router.get("/verify/:token", async (req, res) => {
  try {
    await authController.verifyEmail(req.params.token);

    return res.json({
      message: "Account Verified successfuly",
    });
  } catch (e) {
    return res.json({
      message: e.message,
    });
  }
});
