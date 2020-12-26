const controller = require("../controllers/people.controller")


module.exports = function(app) {

    app.get("/api/people",controller.getPeople)
    app.post("/api/people",controller.addPeople)
};