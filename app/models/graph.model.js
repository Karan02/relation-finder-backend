const mongoose = require("mongoose");

const Graphi = mongoose.model(
  "Graph",
  new mongoose.Schema({
    nameToId:Object,
    idToName:Object,
    graph:Object,
    next:Number
  })
);

module.exports = Graphi;
