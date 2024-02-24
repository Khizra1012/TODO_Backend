const mongoose = require("mongoose");

const connectdb = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "backendApi",
    })
    .then((res) => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectdb;
