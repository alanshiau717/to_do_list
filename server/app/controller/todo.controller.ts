//controller responsible for tasks which require multiple different todolist models

import { Request, Response } from "express";
import { FolderModel as Folder } from "../models/folders";
import { ListModel as List, ListDoc } from "../models/lists";
import { TaskModel as Task } from "../models/tasks";

const todo = {
  //takes optional query paramter of folderid
  //if nothing if passed, will return all folders
  //if query paraters of folderId is passed will only return specific folder
  getFolderRec: (req: Request, res: Response) => {
    Folder.find({ user: req.userId }, (err, output) => {
      if (err) {
        res.status(400).send({ err });
        return res.end();
      } else {
        output.map((folder) => {
          //   folder.lists = List.find({ user: req.userId }, (err, output) => {});
        });
      }
    });
  },
};
