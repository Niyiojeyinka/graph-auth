/** return the base domain/ip/url of this server
 *
 * @param {*} req
 * @returns String base url
 */
exports.url = function (req) {
  return req.protocol + "://" + req.get("host");
};

/** check if url supplied is valid
 *
 * @param {*} url
 * @returns Boolean returns true or false
 */
exports.validateURL = function (url) {
  const res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
};

exports.slugify = (word, separator = "-") => {
  return word
    .toString()
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, separator);
};
