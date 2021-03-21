const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
import { Request, Response, NextFunction } from "express";
// import Request from "../backend_types/auth_req";

var verifyToken = function (req: Request, res: Response, next: NextFunction) {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.default.secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
};

export default verifyToken;
