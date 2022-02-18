const nodemailer = require("nodemailer");


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
 * @param {*} handleResult  callback function with error ,info
 *  object (info.response) as parameter respectively
 */
exports.sendMail = (receiver, valueObjects, fileName, handleResult) => {

  const {MAIL_HOST, MAIL_FROM,MAIL_PORT,MAIL_SECURE,MAIL_USER,MAIL_PASS} = process.env

  const transporter = nodemailer.createTransport({
    pool: true,
    host:MAIL_HOST,
    port: MAIL_PORT,
    secure: MAIL_SECURE, // use TLS
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });

  const mailFile = require("../mails/" + fileName);

  const mailOptions = {
    from: MAIL_FROM,
    to: receiver,
    subject: valueObjects.title,
    html: mailFile.view(valueObjects),
  };

  transporter.sendMail(mailOptions, handleResult);
};
