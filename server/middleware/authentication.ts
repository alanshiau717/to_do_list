import * as express from "express";
// import { UserSessionMod } from "../../node/mongo/entities/userSession";
import {UserService} from "../services/user-service"
import * as jwt from "jsonwebtoken";
import { AuthError } from "../common/auth-error";
import { HttpStatusCode } from "../common/http-status-code";
// import { AuthenticationError } from "apollo-server";

// declare module "jsonwebtoken" {
//   export interface JwtPayload {
//     sessionId: string,
//     userId: string
//   }
// }
export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
    console.log(scopes)
  console.log("security name", securityName)
  if(securityName === "api_key"){    
    try {
      const userService = new UserService();
      let jwtToken = request.cookies['token']
      // console.log("jwtToken", jwtToken)
      const decodedToken = jwt.verify(jwtToken,process.env.JWT_SECRET!)
      if (typeof decodedToken === 'string' || decodedToken instanceof String) {
        throw new AuthError("AUTHENTICATION_ERROR", HttpStatusCode.UNAUTHORIZED)
      }
      else{     
        console.log("Hit decoded string") 
        let isValidUserSession = await userService.isValidUserSession(decodedToken.sessionId, decodedToken.userId)
        if (isValidUserSession){
          console.log('resolving promise')
          return Promise.resolve({
            userId: decodedToken.userId,
            sessionId: decodedToken.sessionId
          })

        }
        throw new AuthError("INVALID_SESSION", HttpStatusCode.UNAUTHORIZED)
      }
    }catch{
      throw new AuthError("AUTHENTICATION_ERROR", HttpStatusCode.UNAUTHORIZED)
    }
  
  }
  return Promise.reject({})


//   if (securityName === "jwt") {
//     const token =
//       request.body.token ||
//       request.query.token ||
//       request.headers["x-access-token"];

//     return new Promise((resolve, reject) => {
//       if (!token) {
//         reject(new Error("No token provided"));
//       }
//       jwt.verify(token, "[secret]", function (err: any, decoded: any) {
//         if (err) {
//           reject(err);
//         } else {
//           // Check if JWT contains all required scopes
//           for (let scope of scopes) {
//             if (!decoded.scopes.includes(scope)) {
//               reject(new Error("JWT does not contain required scope."));
//             }
//           }
//           resolve(decoded);
//         }
//       });
//     });
//   }
}


// export async test(req: express.Request) => {
//   console.log("Hit graphql authentication")
//   // return {user: "testuser"}
//   try {
//     const userService = new UserService();
//     console.log("cookies",req.cookies)
//     let jwtToken = req.cookies['token']
//     console.log("jwtToken", jwtToken)
//     const decodedToken = jwt.verify(jwtToken,process.env.JWT_SECRET!)
//     if (typeof decodedToken === 'string' || decodedToken instanceof String) {
//       return {user: "testUser"}
//       // return null
//       // throw new AuthenticationError("Authentication Error")
//     }
//     else{     
//       console.log("Hit decoded string") 
//       let isValidUserSession = await userService.isValidUserSession(decodedToken.sessionId, decodedToken.userId)
//       if (isValidUserSession){
//         console.log('resolving promise')

//         return Promise.resolve({
//           userId: decodedToken.userId,
//           sessionId: decodedToken.sessionId,
//           isValidSession: true
//         })

//       }
//       return {user: "testUser"}
//       // return null
//       // throw new AuthenticationError("You Must Be Logged In")
//     }
//   }catch(err){
//     console.log(err)
//     return {user: "testUser"}
//     // return null
//     // throw new AuthenticationError("Authentication Error")
//   }
// }

export default async (req: any, _: express.Response, next: express.NextFunction) => {
  // console.debug("hit auth middleware")
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
      req.userId = 1
      req.sessionId = 1
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