import { Request, Response } from "express";
import Folder from "../models/folders";

//Search params in body. If no search params, will return folders for the user
exports.getFolder = (req: Request, res: Response) => {
  var { body } = req;
  // user somehow passed a userId which they shouldn't have
  if (body.userId) {
    res.status(400).send({ message: "Error: Internal Server Error" });
    return res.end();
  }
  Folder.find({ ...body, user: req.userId }, (err, output) => {
    if (err) {
      res.status(400).send({ message: "Error: Internal Server Error" });
      return res.end();
    }
    res.status(200).send(output);
    return res.end();
  });
};

// Creates a single folder
exports.createFolder = (req: Request, res: Response) => {
  const NewFolder = new Folder();
  const { body } = req;
  const { name, due, order, list } = body;

  NewFolder.name = name;
  NewFolder.created = new Date();
  NewFolder.done = false;
  NewFolder.order = order;
  NewFolder.isDeleted = false;

  if (req.userId) {
    NewFolder.user = req.userId;
  } else {
    res.status(400).send({ message: "Error: Internal Server Error" });
  }
  NewFolder.save((err, output) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: "Error: Internal Server Error" });
    }
    res.status(200).send(output);
  });
};
