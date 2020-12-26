const mongoose = require("mongoose");

const   Relation = mongoose.model(
  "Relation",
  new mongoose.Schema({
    person:String,
    relationship:String,
    secondaryPerson:String
  })
);

module.exports =    Relation;
