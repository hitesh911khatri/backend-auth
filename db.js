const mongooes = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = async () => {
  try {
    await mongooes.connect(process.env.mongoDb_Url);
    console.log("connect to mongoDb");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
