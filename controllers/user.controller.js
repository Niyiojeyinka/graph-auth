const { User, EmailVerification } = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mail = require("../helpers/mail.helper");

/** Register new user
 */
exports.register = async (inputData) => {
  try {
    const { email, name, mobileNumber, password, country } = inputData;

    if (!mail.validateEmail(email)) {
      throw new Error("Email not Valid");
    }
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      throw new Error("User with this Email Already Exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email: email,
      password: hashed,
      country: country,
      mobileNumber: mobileNumber,
    });

    user.verification = await EmailVerification.create({
      verifiedAt: null,
      token: null,
    });

    user.save();

    exports.sendVerificationMail(user);

    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

/** sign in user
 */
exports.login = async (inputData) => {
  try {
    const { email, password } = inputData;

    if (!email || !password) {
      throw new Error("Both Password and Email are required.");
    }
    let user = await User.findOne({
      email: email,
    });

    const valid = await bcrypt.compare(password, user?.password);

    if (!valid || !user) {
      throw new Error("Incorrect Password/Email");
    }
    if (!user.emailVerified) {
      throw new Error("Please verify you email before you login, check your email for verification URL");
    }

    return exports.authenticatedResponse(user);
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.resendVerification = async (expiredToken) => {
  try {
    const verification = await EmailVerification.findOne({
      token: expiredToken,
    });

    const user = await User.findOne({
      verification: verification,
    }).populate("verification");

    exports.sendVerificationMail(user);
  } catch (e) {
    throw new Error(e.message);
  }
};

/** get all users
 */
exports.getAllUsers = async () => {
  try {
    const users = await User.find({}).populate("verification");

    return users;
  } catch (e) {
    throw new Error(e.message);
  }
};

/** get single user
 */
exports.getSingleUser = async (_id) => {
  try {
    const user = await User.findOne({ _id: _id }).populate("verification");

    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.verifyEmail = async (verifyToken) => {
  try {
    const { EMAIL_VERIFICATION_EXPIRY_MINUTES } = process.env;

    const verification = await EmailVerification.findOne({
      token: verifyToken,
    });

    const expiryTime =
      EMAIL_VERIFICATION_EXPIRY_MINUTES * 60 * 1000 +
      Date.parse(verification.updatedAt);

    const now = new Date().getTime();

    if (expiryTime < now) {
      throw new Error("Verification Token Expired");
    }

    const user = await User.findOne({
      verification: verification,
    });
    user.emailVerified = true;
    user.save();

    verification.token = null;
    verification.verifiedAt = new Date();
    verification.save();

    exports.sendEmailVerifiedMail(user);
    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.authenticatedResponse = (user) => {
  const token = jwt.sign({ userId: user._id }, "RANDOM_KEY", {
    expiresIn: "24h",
  });

  return { token, user };
};

exports.sendVerificationMail = async (user) => {
  try {
    const { BASE_URL, MAIL_VERIFY_TITLE } = process.env;

    //generate token and update right record

    const token = Math.random().toString(36).slice(2);

    await EmailVerification.updateOne(
      {
        _id: user.verification._id,
      },
      {
        token,
      }
    );

    mail.sendMail(
      user.email,

      {
        name: user.name,
        title: MAIL_VERIFY_TITLE,
        url: BASE_URL + "/api/verify/" + token,
      },
      "verification"
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.sendEmailVerifiedMail = (user) => {
  try {
    //send a mail here
    // please note that in a non assesment project, this will be a background
    //job so as not to hold user 's request down using either bull or any other
    //background job library or even using another  process

    mail.sendMail(
      user.email,

      {
        name: user.name,
        title: "Email Verified",
      },
      "email_verified"
    );
  } catch (e) {
    throw new Error(e.message);
  }
};
