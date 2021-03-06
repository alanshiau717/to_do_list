import { Request, Response } from "express";
import { TaskModel as Task } from "../models/tasks";
import { ListModel as List } from "../models/lists";

const task = {
  //Search params in body. If no search params, will return all tasks of user
  getTask: (req: Request, res: Response) => {
    const { query } = req;
    // user somehow passed a userId which they shouldn't have
    if (query.userId) {
      res.status(400).send({ message: "Error: Internal Server Error" });
      return res.end();
    }
    Task.find({ ...query, user: req.userId }, (err, output) => {
      if (err) {
        res.status(400).send({ message: "Error: Internal Server Error" });
        return res.end();
      }
      res.status(200).send(output);
      return res.end();
    });
  },
  // Creates a single task, if no list is specified, will be placed into inbox.
  // If there is no inbox, will create one.
  createTask: (req: Request, res: Response) => {
    const NewTask = new Task();
    const { body } = req;
    const { name, due, order, list } = body;
    NewTask.name = name;
    NewTask.created = new Date();
    NewTask.due = due;
    NewTask.done = false;
    NewTask.order = order;
    NewTask.isDeleted = false;
    NewTask.list = list;
    //if we didn't specify a list, revert to default
    if (req.userId) {
      NewTask.user = req.userId;
    } else {
      res.status(400).send({ message: "Error: Internal Server Error" });
      return res.end();
    }
    NewTask.save((err, output) => {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "Error: Internal Server Error" });
      }
      let task_output = output
      List.findOneAndUpdate({ _id: list }, { $push: { tasks: output._id } })
        .then((output) => {
          res.status(200).send(task_output);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    });
  },
  //Completes a task.
  completeTask: (req: Request, res: Response) => {
    const { body } = req;
    const { taskId } = body;
    Task.updateOne({ _id: taskId, user: req.userId }, { done: true })
      .then((output) => {
        res.status(200).send(output);
      })
      .catch((err) => {
        res.status(400).send({ err });
      });
  },
  //Changes a property of the task
  changeTask: (req: Request, res: Response) => {
    const { body } = req;
    const { taskId, ...other_params } = body;
    if ((!body.name) && (!body.due) && (!body.isDeleted) && (!body.list)) {
      res.status(400).send("Didn't find valid field to change").end()
    }
    Task.updateOne({ _id: body.taskId, user: req.userId }, { ...other_params })
      .then((output) => {
        res.status(200).send(output);
      })
      .catch((err) => {
        res.status(400).send({ err });
      });
  },
  //Deletes a task
  deleteTask: (req: Request, res: Response) => {
    const taskId = req.query.taskId;
    Task.updateOne({ _id: taskId, user: req.userId }, { isDeleted: true })
      .then((output) => {
        res.status(200).send(output);
      })
      .catch((err) => {
        res.status(400).send({ err });
      });
  },
};

export default task;
