import { Request, Response } from "express";
import List from "../models/lists";

//Search params in body. If no search params, will return all lists
exports.getTask = (req: Request, res: Response) => {
  var { body } = req;
  // user somehow passed a userId which they shouldn't have
  if (body.userId) {
    res.status(400).send({ message: "Error: Internal Server Error" });
    return res.end();
  }
  List.find({ ...body, user: req.userId }, (err, output) => {
    if (err) {
      res.status(400).send({ message: "Error: Internal Server Error" });
      return res.end();
    }
    res.status(200).send(output);
    return res.end();
  });
};

// Creates a single task
exports.createTask = (req: Request, res: Response) => {
  const NewTask = new List();
  const { body } = req;
  const { name, due, order, list } = body;

  NewTask.name = name;
  NewTask.created = new Date();
  NewTask.due = due;
  NewTask.done = false;
  NewTask.order = order;
  NewTask.isDeleted = false;
  NewTask.list = list;

  if (req.userId) {
    NewTask.user = req.userId;
  } else {
    res.status(400).send({ message: "Error: Internal Server Error" });
  }
  NewTask.save((err, output) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: "Error: Internal Server Error" });
    }
    res.status(200).send(output);
  });
};
