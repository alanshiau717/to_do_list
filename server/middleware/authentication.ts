import * as express from "express";
// import { UserSessionMod } from "../../node/mongo/entities/userSession";
import {UserService} from "../services/user-service"
import * as jwt from "jsonwebtoken";
import { AuthError } from "../common/auth-error";
import { HttpStatusCode } from "../common/http-status-code";

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
      console.log("jwtToken", jwtToken)
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
