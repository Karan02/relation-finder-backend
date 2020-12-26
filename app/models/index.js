const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.people = require("./people.model");
db.tag = require("./tag.model");
db.relation = require("./relation.model");
db.graph = require("./graph.model")

module.exports = db;