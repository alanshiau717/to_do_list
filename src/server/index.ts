import http from "http";
import path from "path";
import express from "express";
import { environment } from "../node/environment";
import { log } from "../node/utils/log";
import { getAssetsJSON } from "./common/get-assets-json";
import { registerRoutes } from "./register-routes";
import bodyParser from "body-parser";
import connectToDb from "../node/mongo/get-db-connection"

export const server = () => {
  const app = express()
    .set("view engine", "ejs")
    .use(express.static(".public"));
  //parse requests of content-type -application/json
  app.use(bodyParser.json());
  connectToDb();
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  app.get("/", async (_req, res) => {
    const assetsJSON = await getAssetsJSON();

    res.render(path.join(__dirname, "../../views/index.ejs"), { assetsJSON });
  });

  registerRoutes(app);

  const { SERVER_PORT } = environment();

  return new Promise<http.Server>((resolve) => {
    const s = app.listen(SERVER_PORT, () => {
      log.success(`Started server at http://localhost:${SERVER_PORT}`);
      resolve(s);
    });
  });
};
