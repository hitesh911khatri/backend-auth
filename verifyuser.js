const mongooes = require("mongoose");

const verifySchema = new mongooes.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      require: true,
    },
  },
  {
    Collection: "verifyUser",
  }
);

module.exports = mongooes.model("verifyUser", verifySchema);
