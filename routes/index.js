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
    if (e.message == "Verification Token Expired") {
      const resendURL = BASE_URL + "/api/resend/" + token;

      return res.json({
        message: `please request for new token at ${resendURL}`,
      });
    }
    return res.json({
      message: e.message,
    });
  }
});


router.get("/resend/:token", async (req, res) => {
    try {
      await authController.resendVerification(req.params.token);
  
      return res.json({
        message: "Resend successfuly, Please check your mail",
      });
    } catch (e) {
       
      return res.json({
        message: e.message,
      });
    }
  });

module.exports = router;
