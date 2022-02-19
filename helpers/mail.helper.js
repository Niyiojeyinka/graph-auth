const nodemailer = require("nodemailer");
require("dotenv").config();

exports.validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/** send email method
 *
 * @param {*} receiver receiver email
 * @param {*} valueObjects values to transfer to view files
 * @param {*} fileName name of email template file
 *  object (info.response) as parameter respectively
 */
exports.sendMail = (receiver, valueObjects, fileName) => {
  try {
    const {
      MAIL_HOST,
      MAIL_SECURE,
      MAIL_FROM,
      MAIL_PORT,
      MAIL_USER,
      MAIL_PASS,
    } = process.env;

    const configs = {
      pool: true,
      host: MAIL_HOST,
      port: parseInt(MAIL_PORT),
      secure: Boolean(MAIL_SECURE), // use TLS
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    };

    const transporter = nodemailer.createTransport(configs);

    const mailFile = require("../mails/" + fileName);

    const mailOptions = {
      // from: MAIL_FROM,
      to: receiver,
      subject: valueObjects.title,
      html: mailFile.view(valueObjects),
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      console.log("Info: ", info);
      console.log({
        message: "Email successfully sent.",
      });
    });
  } catch (e) {
    console.log(e.message);
  }
};
