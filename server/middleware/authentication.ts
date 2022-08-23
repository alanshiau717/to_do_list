import * as express from "express";
import {UserService} from "../services/user-service"
import * as jwt from "jsonwebtoken";


export default async (req: any, _: express.Response, next: express.NextFunction) => {
  try {
    const userService = new UserService();
    const decodedToken = validateAndDecodeJwtToken(req.cookies['token'])
    let isValidUserSession = await userService.isValidUserSession(decodedToken.sessionId, decodedToken.userId)
    if(isValidUserSession) {
      req.userId = decodedToken.userId
      req.sessionId = decodedToken.sessionId
    }
  } catch(err) {
    // req.userId = 1
    // req.sessionId = 1
    req.userId = null
    req.sessionId = null
  }
  return next();
}

function validateAndDecodeJwtToken(cookie: string) {
  const decodedToken = jwt.verify(cookie,process.env.JWT_SECRET!)
  if (!(typeof decodedToken === 'string' || decodedToken instanceof String)) {
    return decodedToken
  }
  throw Error("Invalid JWT Token")
} 