import { Request, Response } from "express";
import { FolderModel as Folder } from "../models/folders";

const folder = {
  //Search params in body. If no search params, will return folders for the user
  getFolder: (req: Request, res: Response) => {
    const { query } = req;
    // user somehow passed a userId which they shouldn't have
    if (query.userId) {
      res.status(400).send({ message: "Error: Internal Server Error" });
      return res.end();
    }
    Folder.find({ ...query, user: req.userId })
      .populate({ path: "lists", populate: { path: "tasks" } })
      .then((output) => {
        res.status(200).send(output);
      })
      .catch((err) => {
        res.status(400).send({ message: "Error: Internal Server Error" });
      });
    // Folder.find({ ...query, user: req.userId }, (err, output) => {
    //   if (err) {
    //     res.status(400).send({ message: "Error: Internal Server Error" });
    //     return res.end();
    //   }
    //   res.status(200).send(output);
    //   return res.end();
    // });
  },
  // Creates a single folder
  createFolder: (req: Request, res: Response) => {
    const NewFolder = new Folder();
    const { body } = req;
    const { name, order } = body;

    NewFolder.name = name;
    NewFolder.created = new Date();
    NewFolder.done = false;
    NewFolder.order = order;
    NewFolder.isDeleted = false;
    //Check if we have a userId
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
  },
  deleteFolder: (req: Request, res: Response) => {
    if (req.query.folderId) {
      Folder.updateOne(
        { _id: req.query.folderId, user: req.userId },
        { isDeleted: true }
      )
        .then((output) => {
          res.status(200).send(output);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    } else {
      res.status(400).send("Folder ID doesn't exist");
    }
  },
};
export default folder;
