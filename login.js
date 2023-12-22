const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const client = require("../redis");
const jwt = require("jsonwebtoken");
const { json } = require("express");
dotenv.config();

async function CheckUser(email) {
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      return true;
    }
    return false;
  } catch (e) {
    return "Server Busy";
  }
}

async function AuthenticateUser(email, password) {
  try {
    const userCheck = await User.findOne({ email: email });
    console.log(userCheck);
    const vaildPassword = await bcrypt.compare(password, userCheck.password);
    console.log(vaildPassword);
    if (vaildPassword) {
      const token = jwt.sign({ email }, process.env.login_secert_token);
      const response = {
        id: userCheck._id,
        name: userCheck.name,
        email: userCheck.email,
        token: token,
        status: true,
      };

      await client.set(`key-${email}`, JSON.stringify(response));

      await User.findOneAndUpdate(
        { email: userCheck.email },
        { $set: { token } },
        { new: true }
      );
      return response;
    }
    return "invalid user name or password";
  } catch (e) {
    console.log(e);
    return "server busy";
  }
}

async function AuthorizedUser(token) {
  try {
    const decodeToken = jwt.verify(token, process.env.login_secert_token);
    if (decodeToken) {
      const email = decodeToken.email;
      const auth = await client.get(`key-${email}`);
      if (auth) {
        const data = JSON.parse(auth);
        return data;
      } else {
        const data = await User.findOne({ email: email });
        return data;
      }
    }
    return false;
  } catch (e) {
    console.log(e);
  }
}

module.exports = { CheckUser, AuthenticateUser, AuthorizedUser };
