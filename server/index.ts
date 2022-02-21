import http from "http";
// import path from "path";
import express from "express";
// import { environment } from "../node/environment";
// import { log } from "../node/utils/log";
// import { getAssetsJSON } from "./common/get-assets-json";
import { registerRoutes } from "./register-routes";
import bodyParser from "body-parser";
// import connectToDb from "../node/mongo/get-db-connection"
import cookieParser from "cookie-parser"
// import cors from "cors"
import dotenv from "dotenv";
// const result = dotenv.config({path: "../.env"})
const result = dotenv.config({ path: `${__dirname}/../.env` }) 
console.log(result.parsed)
// .config({path: '../.env'})
export const server = () => {
  const app = express()
    // .set("view engine", "ejs")
    // .use(express.static(".public"));
  //parse requests of content-type -application/json
  app.use(bodyParser.json());
  app.use(cookieParser())
  // app.use(cors())
  // console.log("JWT Environment",process.env)
  app.use(function(req, res, next) {
    // console.log(req)
    console.log(req.body)
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  //   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });



  // connectToDb();
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.get("/", async (_req, res) => {
  //   const assetsJSON = await getAssetsJSON();

  //   res.render(path.join(__dirname, "../../views/index.ejs"), { assetsJSON });
  // });

  registerRoutes(app);

  // const { SERVER_PORT } = environment();
 const SERVER_PORT = 3001
  return new Promise<http.Server>((resolve) => {
    const s = app.listen(SERVER_PORT, () => {
      // log.success(`Started server at http://localhost:${SERVER_PORT}`);
      resolve(s);
    });
  });
};
