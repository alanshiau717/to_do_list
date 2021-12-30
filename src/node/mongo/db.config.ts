import mongoose from "mongoose";

const db = {
  mongoose: mongoose,
  url: "mongodb://localhost:27017",
  configs:
  {
    user: "admin",
    pass: "admin",
    dbName: "todolist",
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};


export default db;
