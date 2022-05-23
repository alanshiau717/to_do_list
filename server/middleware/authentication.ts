import * as express from "express";
import {UserService} from "../services/user-service"
import * as jwt from "jsonwebtoken";


export default async (req: any, _: express.Response, next: express.NextFunction) => {
  console.log("hit middleware")
  try {
    const userService = new UserService();
    const decodedToken = validateAndDecodeJwtToken(req.cookies['token'])
    let isValidUserSession = await userService.isValidUserSession(decodedToken.sessionId, decodedToken.userId)
    if(isValidUserSession) {
      // req.userId = 1
      // req.sessionId = 1
      req.userId = decodedToken.userId
      req.sessionId = decodedToken.sessionId
    }
  } catch(err) {
    req.userId = null
    req.sessionId = null
      // req.userId = 9
      // req.sessionId = 1
  }
  return next();
}

function validateAndDecodeJwtToken(cookie: string) {
  // console.debug("encoded token",cookie)
  const decodedToken = jwt.verify(cookie,process.env.JWT_SECRET!)
  // console.debug("decoded token",decodedToken)
  if (!(typeof decodedToken === 'string' || decodedToken instanceof String)) {
    return decodedToken
  }
  throw Error("Invalid JWT Token")
} 