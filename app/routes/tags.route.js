const controller = require("../controllers/tag.controller")


module.exports = function(app) {

    app.get("/api/tags",controller.getTags)
    app.post("/api/tags",controller.addTags)

  };