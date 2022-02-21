import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library"
// import { FolderModel } from "../../node/mongo/entities/folder"
// import { ListModel } from "../../node/mongo/entities/list";
import { AuthError } from "../common/auth-error";
import { HttpStatusCode } from "../common/http-status-code";
// import {UserSessionMod} from "../../node/mongo/entities/userSession"
// import {UserMod, UserDoc } from "../../node/mongo/entities/user"
// import {FolderRepository} from "../../database/src/repositories/FolderRepository"
import { UserRepository } from "../database/repositories/UserRepository"
import { ListRepository } from "../database/repositories/ListRepository"
import {UserSessionRepository} from "../database/repositories/UserSessionRepository"
// import {ListRepository} from "../../database/src/repositories/ListRepository"
import jwt from "jsonwebtoken"
import { InternalServerError } from "../common/internal-server-error";
import bcrypt from "bcrypt"
import { FolderRepository } from "../database/repositories/FolderRepository";
import {IUser, IUserCreateProps} from "../database/entity/User"
// import { createImportSpecifier } from "typescript";
// import { Folder } from "../../database/src/entity/Folder";

interface IUserService {
    client: OAuth2Client
}

interface UserCreationResult {
    userId: number
    defaultFolderId: number
    inboxId: number
}

export class UserService implements IUserService {
    client = new OAuth2Client("154518758211-0h56764sro2iimsjkh1hu2svmsc86c76.apps.googleusercontent.com")
    public async signup() {
    }
    public async createNewUserSessionToken(userId: number) : Promise<string>{
        // const userSession = new UserSessionMod();
        const userSession = await this.userSessionRepository.create({
            user: userId
        })
        // userSession.userId = userId;
        // const sessionDetails = await userSession.save();

        if (!process.env.JWT_SECRET){
            console.log("failed to sign jwt")
            throw new InternalServerError("FAILED TO READ JWT SECRET")
        }
        else{
            console.log("signing jwt")
            return jwt.sign({userId: userId, sessionId: userSession.id }, process.env.JWT_SECRET, {
                expiresIn: 86400
            })
        }
    }
    public async verifyGoogleAuthToken(IdToken: string){
        const ticket = await this.client.verifyIdToken({
            idToken: IdToken,
            audience: "154518758211-0h56764sro2iimsjkh1hu2svmsc86c76.apps.googleusercontent.com"
        }).then((ticket) => {
            return this.handleSuccessfulVerifyIdTokenResponse(ticket)
            // const payload = ticket.getPayload();
            // const userid = payload.sub;
            // return userid
        }).catch(
            () => {
                throw new AuthError("INVALID_USER_ID", HttpStatusCode.UNAUTHORIZED)
            }
        )
        return ticket
    }
    private handleSuccessfulVerifyIdTokenResponse(ticket: LoginTicket){
        const payload = ticket.getPayload();
        if(payload){
        if(payload.sub){
            return payload}
        }
        throw new AuthError("AUTHENTICATION_ERROR", HttpStatusCode.UNAUTHORIZED)
    }
    public async googleUserAlreadyExists(email: string): Promise<boolean>{
        const user = await this.findUserByEmail(email)
        if(user === null){
            console.log("google user doesn't exist") 
            return false
        }
        else{   
            console.log("google user exists")     
            return true
        }
    }

    public async createNewNativeUserFromGoogleUser(tokenPayload: TokenPayload): Promise<UserCreationResult> {

        //Check Params are okay
        //Create New User
        if (!tokenPayload.email || !tokenPayload.given_name || !tokenPayload.family_name) {
            throw new InternalServerError("Internal Server Error")
        }
        const result = await this.createNewUser(
            {
                email: tokenPayload.email,
                firstName: tokenPayload.given_name,
                lastName: tokenPayload.family_name,
                googleUserSub: tokenPayload.sub 
            })
        return result
    }

    public async handleValidGoogleUserLogin(validGoogleUser: TokenPayload){
        let user = await this.userRepository.findOne({where: {
            googleUserSub: validGoogleUser.sub
        }})
        let userId
        let defaultFolderId
        let inboxId

        if (!user) {
            let userCreationResult = await this.createNewNativeUserFromGoogleUser(validGoogleUser)
            inboxId = userCreationResult.inboxId
            defaultFolderId = userCreationResult.defaultFolderId
            userId = userCreationResult.userId
        }else {
            defaultFolderId = user.defaultFolderId
            inboxId = user.inboxId 
            userId = user.id
        }
    
        const userSessionJwt = await this.createNewUserSessionToken(userId)

        return {
            accessToken: userSessionJwt,
            defaultFolder: defaultFolderId,
            inbox: inboxId
        }
    }

    public async createNewUser(userData: IUserCreateProps): Promise<UserCreationResult> {
        if(userData.password) {
            userData.password = this.generateHash(userData.password)
        }

        const user = await this.userRepository.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password
        })
    
        const folder = await this.folderRepository.create({
            name: "default",
            user: user.id
        })

        const list = await this.listRepository.create({
            name: "inbox",
            user: user.id,
            folder: folder.id
        })
        
        await this.userRepository.updateOne(user.id, {
            defaultFolder: folder.id,
            inbox: list.id
        })
        return {
            userId: user.id,
            defaultFolderId: folder.id,
            inboxId: list.id,
        };
    }

    // public async createNewUser(email: string, firstName: string, lastName: string, password?: string) {

    //     if(password) {
    //         password = this.generateHash(password)
    //     }

    //     const user = await this.userRepository.create({
    //         firstName: firstName,
    //         lastName: lastName,
    //         email: email,
    //         password: password
    //     })
    
    //     const folder = await this.folderRepository.create({
    //         name: "default",
    //         user: user.id
    //     })

    //     const list = await this.listRepository.create({
    //         name: "inbox",
    //         user: user.id,
    //         folder: folder.id
    //     })
        
    //     await this.userRepository.updateOne(user.id, {
    //         defaultFolder: folder.id,
    //         inbox: list.id
    //     })

    //     return user;
    // }
    public async getUser(request: number) {
        const user = await this.userRepository.findOne({ where: { id: request }, relations: ["folders"] })
        if (user === undefined) {
            throw Error
        }
        return user


    }

    public async isValidUserSession(sessionId: string, userId: number) : Promise<boolean>{
        // const session = await this.userSessionRepository.findOne(
        //     {select: 
        //         {is}
        // }
        // );
        const session = await this.userSessionRepository.findOneById(sessionId, {})

        // const session = await this.userSessionRepository.findById(sessionId).exec()
        if (!session){
            return false
        }
        if(!session.isRevoked && session.user.id === userId){
            return true
        }
        return false
    }

    public async findUserByEmail(email: string){
        const users = await this.userRepository.find(
            {where: {
                email: email
            }}
        )
        // const users = await this.userRepository.find({email: email}).exec()
        if(!users || users.length == 0 ){
            return null
        }
        else if(users.length!=1) {
            throw new InternalServerError("Internal Server Error")
        }
        return users[0]
    }
    public async retrieveNativeUserIfValid(email: string, password: string): Promise<IUser>{
        // const users = await this.userRepository.find({email: email}).exec()
        const user = await this.findUserByEmail(email)
        if(user===null){
            throw new AuthError("INVALID_EMAIL_OR_PASSWORD", 401)
        }
        if(this.validatePassword(user, password)){
            return user
        }
        throw new AuthError("INVALID_EMAIL_OR_PASSWORD", 401)
    }
    private validatePassword(user: IUser, password: string){
        return bcrypt.compareSync(password, user.password);
    }



    
    private generateHash(password: string) : string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    }

    private get userRepository() {
        return new UserRepository();
    }

    private get listRepository() {
        return new ListRepository();
    }

    private get folderRepository() {
        return new FolderRepository();
    }

    private get userSessionRepository() {
        return new UserSessionRepository();
    }

}