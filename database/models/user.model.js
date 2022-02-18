const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { ACTIVE, INACTIVE } = require("../../enums/userstatus.enum");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, index: true, unique: true, required: true },
    country: { type: String, required: true },
    status: { type: String, enum: [ACTIVE, INACTIVE], default: ACTIVE },
    mobileNumber: { type: String },
    password: { type: String ,required: true},
    emailVerified: {type: Boolean ,required: true,default: false},
    verification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EmailVerification"
    }
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
