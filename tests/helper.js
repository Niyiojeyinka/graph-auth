const db = require("../models");
const jwt = require("jsonwebtoken");

exports.generateLoginToken = async (email) => {
  user = await db.User.findOne({
    where: {
      email: email,
    },
  });

  return jwt.sign({ userId: user.id }, "RANDOM_KEY", {
    expiresIn: "24h",
  });
};
