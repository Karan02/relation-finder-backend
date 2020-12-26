const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "https://relation-finder-backend.herokuapp.com/"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");


db.mongoose
  .connect('mongodb+srv://Karan:mongo2mongo@cluster0.y3byy.mongodb.net/', {dbName: 'raftlabs'}, { useUnifiedTopology: true ,useNewUrlParser: true,useCreateIndex: true
})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to  application." });
});

// routes
require("./app/routes/people.route.js")(app);
require("./app/routes/tags.route.js")(app);
require("./app/routes/relation.route.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



