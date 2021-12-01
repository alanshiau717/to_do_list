import { dbconfig } from "../config/db.config";
import mongoose from "mongoose";

const db = {
  mongoose: mongoose,
  url: dbconfig.DB_URL!,
  configs:
  {
    user: dbconfig.DB_USER!,
    pass: dbconfig.DB_PWD!,
    dbName: dbconfig.DB_NAME!,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};


export default db;
