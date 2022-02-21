import {HttpStatusCode} from "./http-status-code"

export type InternalServerErrorMessage = "Internal Server Error" | "FAILED TO READ JWT SECRET"

   

export class InternalServerError extends Error {
    readonly status = HttpStatusCode.INTERNAL_SERVER_ERROR
    constructor(message: InternalServerErrorMessage) {
        super(message);
      }
}

