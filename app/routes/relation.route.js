const controller = require("../controllers/relation.controller")


module.exports = function(app) {

    app.get("/api/relations",controller.getRelation)
    app.post("/api/relations",controller.addRelation)
    app.post("/api/relationship",controller.getRelationship)

  };