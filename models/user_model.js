const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,   //it measn k jb jb user ka data access krain gy us mai password nh aaey ga
    required: true,
  },
  createdAt: {
    type: Date,
  default: Date.now},
});

const User = mongoose.model("User", user_schema);

module.exports = User;
