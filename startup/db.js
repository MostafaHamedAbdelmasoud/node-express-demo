const { default: mongoose } = require("mongoose");

module.exports = function () {
  const db = "mongodb://172.18.0.2:27017/docker-mongo";
  mongoose
    .connect(db)
    .then(() => console.log("mongo is connected sucessfully..."));
};
