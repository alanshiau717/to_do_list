import { dbconfig } from "../config/db.config";
import mongoose from "mongoose";
// mongoose.Promise = global.Promise;
const db = {
  mongoose: mongoose,
  url: dbconfig.DB_URL,
};

export default db;
