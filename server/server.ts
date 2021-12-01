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
    ...db.configs
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err: Error) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use("/api/account", require("./app/routes/signin"));
app.use("/api/todolist", require("./app/routes/todoist"));
const port = process.env.PORT || 8080;

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});


