const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const emailVerificationSchema = mongoose.Schema(
  {
    verifiedAt: { type: Date },
    token: { type: String },
  },
  { timestamps: true }
);

emailVerificationSchema.plugin(uniqueValidator);

module.exports = mongoose.model("EmailVerification", emailVerificationSchema);
