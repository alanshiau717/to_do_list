import { Router, Request, Response } from "express";

module.exports = (app: any) => {
  const tasks = require("../controller/task.controller.ts");
  var router = require("express").Router();

  router.get("/", (req: Request, res: Response) => {
    res.send("Hit api");
  });
  router.post("/createtask", tasks.createTask);
  app.use("/api/todolist", router);
};
