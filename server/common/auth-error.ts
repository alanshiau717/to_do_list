import {HttpStatusCode} from "./http-status-code"

export type AuthErrorMessage = 
    | "AUTHENTICATION_ERROR"
    | "AUTHORIZATION_ERROR"
    | "INVALID_USER_ID"
    | "INVALID_SESSION"
    | "INVALID_EMAIL_OR_PASSWORD"
    | "GMAIL_ALREADY_EXISTS"

export class AuthError extends Error {
    constructor(message: AuthErrorMessage, readonly status: HttpStatusCode) {
        super(message);
      }
}