import { Router, Request, Response } from "express";

module.exports = (app: any) => {
  const access = require("../controller/access.ts");
  var router = require("express").Router();

  router.get("/", (req: Request, res: Response) => {
    res.send("Hit api");
  });
  router.post("/signup", access.signup);
  router.post("/signin", access.signin);
  router.get("/verify", access.verify);
  router.post("/logout", access.logout);
  app.use("/api/account", router);
};
