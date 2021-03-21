import { Request, Router, Response } from "express";
import verifyToken from "../middlewares/authJwt";
// import Request from "../backend_types/auth_req";
const tasks = require("../controller/task.controller.ts");
var router = Router();

router.use(verifyToken);
router.get("/", (req: Request, res: Response) => {
  res.send("Hit api");
});
router.post("/createtask", tasks.createTask);
router.get("/gettask", tasks.getTask);
module.exports = router;
