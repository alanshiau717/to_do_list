import { IUserSession, UserSession, IUserSessionCreateProps } from "../entity/UserSession";
import { BaseRepository } from "./BaseRepository";


export class UserSessionRepository extends BaseRepository<
IUserSession,
UserSession, 
IUserSessionCreateProps
> {
    constructor() {
        super(UserSession)
    }
}