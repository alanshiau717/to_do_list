import * as express from "express";
import {UserService} from "../services/user-service"
import * as jwt from "jsonwebtoken";


export default async (req: any, _: express.Response, next: express.NextFunction) => {
  try {
    const userService = new UserService();
    const decodedToken = validateAndDecodeJwtToken(req.cookies['token'])
    let isValidUserSession = await userService.isValidUserSession(decodedToken.sessionId, decodedToken.userId)
    // console.debug("Decoded JWT Token", decodedToken)
    if(isValidUserSession) {
      // console.debug("Valid User Session for user", decodedToken.userId)
      req.userId = decodedToken.userId
      req.sessionId = decodedToken.sessionId
    }
  } catch(err) {
      // console.debug(err)
      req.userId = null
      req.sessionId = null
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