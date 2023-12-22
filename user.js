const mongooes = require("mongoose");

const userSchema = new mongooes.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    joinedOn: {
      type: Date,
      default: Date.now(),
    },
    forgetPassword: {
      time: Date,
      otp: String,
    },
    token: {
      type: String,
    },
  },
  {
    Collection: "User",
  }
);

module.exports = mongooes.model("User", userSchema);
