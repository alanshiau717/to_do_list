const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
import { Request, Response, NextFunction } from "express";
var verifyToken = function (req: any, res: Response, next: NextFunction) {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
};

export default verifyToken;
