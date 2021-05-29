import { Request, Router, Response } from "express";
import verifyToken from "../middlewares/authJwt";
import task from "../controller/task.controller";
import folder from "../controller/folder.controller";
import list from "../controller/list.controller";
var router = Router();

router.use(verifyToken);
router.get("/", (req: Request, res: Response) => {
  res.send("Hit api");
});
//Task API calls
router.get("/gettask", task.getTask);
router.post("/createtask", task.createTask);
router.post("/completetask", task.completeTask);
router.post("/changetask", task.changeTask);
router.delete("/deletetask", task.deleteTask);
//List API calls
router.get("/getlist", list.getList);
router.post("/createList", list.createList);
router.delete("/deletelist", list.deleteList);
//Folder API calls
router.get("/getfolder", folder.getFolder);
router.post("/createFolder", folder.createFolder);
router.delete("/deleteFolder", folder.deleteFolder);

module.exports = router;
