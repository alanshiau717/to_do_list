// import { Query } from "tsoa";
import {  Ctx,  Resolver, Query } from "type-graphql";
// import { UserSession } from "../database/entity/UserSession";
// import { UserSessionRepository } from "../database/repositories/UserSessionRepository";

// import { UserService } from "../services/user-service";

@Resolver()
export class UserSessionResolver {

    @Query(() => Boolean)
    async isValidUserSession(@Ctx() ctx: any) {
        // console.log("ctx:",ctx)
        // // if(ctx.userId)
        // const userSession = await this.userSessionRepository.findOneById(ctx.sessionId, {})
        // if(userSession && userSession.user==ctx.userId){
        //     console.log("returning userSession")
        //     return userSession
        // }
        // console.log("throwing error")
        // throw new Error("Invalid User")
        // console.debug("hit is valid user session", ctx.userId, ctx.sessionId)
        if(ctx.userId || ctx.sessionId){
            return true
        }
        return false
                
    }


    // private get userSessionRepository() {
    //     return new UserSessionRepository
    // }
    
}


