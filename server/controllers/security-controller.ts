// import { Get, Route, Security, Response, Request } from "tsoa";
// import { ICreateFolderRequest } from "./folders-controller";

// interface ErrorResponseModel{
//     error: String
// }



// @Route("secure")
// export class SecureController {
//   @Response<ErrorResponseModel>(300)
//   @Security("api_key")
//   @Get("folder")
//   public async userInfo(@Request() request: any): Promise<ICreateFolderRequest> {
//     return Promise.resolve(request.user);
//   }

// //   @Security("jwt", ["admin"])
// //   @Get("EditUser")
// //   public async userInfo(@Request() request: any): Promise<string> {
// //     // Do something here
// //   }
// }