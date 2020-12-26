const mongoose = require("mongoose");

const People = mongoose.model(
  "Person",
  new mongoose.Schema({
    name: String
  })
);

module.exports = People;
