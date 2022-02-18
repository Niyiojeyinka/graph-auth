const jwt = require("jsonwebtoken");

/** get user id from bearer token
 *
 * @param {*} req
 */
exports.getUserID = (req) => {
  if (!req.headers.authorization) {
    throw new Error("Could not retreive auth data from header");
  }
  const token = req.headers.authorization.split(" ")[1];
  const decodeToken = jwt.verify(token, "RANDOM_KEY");
  return decodeToken.userId;
};
