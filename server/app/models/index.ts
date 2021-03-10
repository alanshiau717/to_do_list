import { dbconfig } from "../config/db.config";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const db = {
  mongoose: mongoose,
  url: dbconfig.url,
  user: require("./User.ts")(mongoose),
  usersession: require("./UserSession.ts")(mongoose),
  tutorials: require("./tutorial.model.ts")(mongoose),
};

export default db;
