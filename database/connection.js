const mongoose = require("mongoose");

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoCreate: true,
};

exports.connect = async (url) => {
 
  await mongoose.connect(url, config);

  console.log(" 🚀 DB connected Successfully", url);
};

exports.dropDatabase = async(url) => {
  const conn = mongoose.createConnection(url);
  await conn.dropDatabase();
  conn.close()

};


 