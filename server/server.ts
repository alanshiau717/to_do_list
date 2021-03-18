import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { allowedNodeEnvironmentFlags } from "process";
// const path = __dirname + "/app/views";
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};
// app.use(express.static(path));
app.use(cors(corsOptions));

//parse requests of content-type -application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

import db from "./app/models";

// define a route handler for the default home page
app.get("/", (req, res) => {
  // res.sendFile(path + "index.html");
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err: Error) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./app/routes/tutorial.routes")(app);
require("./app/routes/signin")(app);
require("./app/routes/todolist")(app);
const port = process.env.PORT || 8080;

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
