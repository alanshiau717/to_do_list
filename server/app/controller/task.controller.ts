import db from "../models/index";
import { Request, Response } from "express";
import Task from "../models/tasks";
import { userInfo } from "os";

// Returns full list
exports.getAll = (req: Request, res: Response) => {};

// Returns one folder
exports.getOne = (req: Request, res: Response) => {};

// Creates one task
exports.createTask = (req: Request, res: Response) => {
  const NewTask = new Task();

  NewTask.name = "test";
  NewTask.created = new Date();
  NewTask.due = new Date();
  NewTask.done = true;
  NewTask.order = 1;
  NewTask.isDeleted = false;
  NewTask.list = "test";
  NewTask.user = "test";

  NewTask.save((err, output) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: "Error: Internval Server Error" });
    }
    res.status(200).send(output);
  });
};
