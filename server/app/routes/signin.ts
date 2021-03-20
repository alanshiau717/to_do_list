import { Router, Request, Response } from "express";

const access = require("../controller/access.ts");
var router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("Hit api");
});
router.post("/signup", access.signup);
router.post("/signin", access.signin);
router.get("/verify", access.verify);
router.post("/logout", access.logout);
module.exports = router;
