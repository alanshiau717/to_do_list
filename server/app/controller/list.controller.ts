import { Request, Response } from "express";
import { ListModel as List } from "../models/lists";
import { FolderModel as Folder } from "../models/folders";
import { Types } from "mongoose";
const list = {
  //Search params in body. If no search params, will return all lists of user
  getList: (req: Request, res: Response) => {
    const { query } = req;
    // user somehow passed a userId which they shouldn't have
    if (query.userId) {
      res.status(400).send({ message: "Error: Internal Server Error" });
      return res.end();
    }

    List.find({ ...query, user: req.userId })
      .populate("tasks")
      .then((output) => {
        res.status(200).send(output);
      })
      .catch((err) => {
        res.status(400).send({ message: "Error: Internal Server Error" });
      });
  },
  //Creates a single list. If no folder is specified will be placed into default folder/
  createList: (req: Request, res: Response) => {
    const NewList = new List();
    const { body } = req;
    const { name, order, folder } = body;

    if (req.userId) {
      NewList.name = name;
      NewList.user = req.userId;
      NewList.order = order;
      NewList.folder = Types.ObjectId(folder);
      NewList.save((err, output) => {
        if (err) {
          console.log(err);
          res.status(400).send({ message: "Error: Internal Server Error" });
        } else {
          const list_out = output
          Folder.findOneAndUpdate(
            { _id: folder },
            { $push: { lists: output._id } }
          )
            .then((output) => {
              res.status(200).send(list_out);
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        }
      });
    } else {
      res.status(400).send({ message: "Error: User ID not found" });
    }
  },
  //Deletes a single list using it's object id
  deleteList: (req: Request, res: Response) => {
    if (req.query.listId) {
      List.updateOne(
        { _id: req.query.listId, user: req.userId },
        { isDeleted: true }
      )
        .then((output) => {
          res.status(200).send(output);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    } else {
      res.status(400).send("List ID doesn't exist");
    }
  },
};

export default list;
