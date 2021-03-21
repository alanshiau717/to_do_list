import { Router, Request, Response } from "express";
import verifyToken from "../middlewares/authJwt";
const tasks = require("../controller/task.controller.ts");
var router = Router();

router.use(verifyToken);
router.get("/", (req: Request, res: Response) => {
  res.send("Hit api");
});
router.post("/createtask", tasks.createTask);

module.exports = router;
