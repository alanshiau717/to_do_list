
import { Body, Controller, Get, Post, Route, Tags, Response, Security } from "tsoa"
import { UserService } from "../services/user-service";
import { IUserCreateProps, IUser} from "../database/entity/User"
// import {IUser} from "../../node/mongo/entities/user"
import { InternalServerError } from "../common/internal-server-error";

interface LogInRequest {
    idToken: string
}


interface ErrorResponseModel{
    error: String
}

export interface UserLoginResponse{
    accessToken: string;
    defaultFolder: number;
    inbox: number;
}

// interface NativeUserLoginRequest{}
type NativeUserLoginRequest = Pick<IUser, "email"|"password">


 
@Route("user")
export class UserController extends Controller {
    @Response<ErrorResponseModel>(300)
    @Post("/googleLogin")
    @Tags("User")
    public async googleLogin(@Body() request: LogInRequest): Promise<UserLoginResponse | void>{
        const validGoogleUser = await this.userService.verifyGoogleAuthToken(request.idToken)
        if(validGoogleUser.email){
            const userLoginResponse = await this.userService.handleValidGoogleUserLogin(validGoogleUser)
            return userLoginResponse;
        }
        else{
            throw new InternalServerError("Internal Server Error")
        }
    }

    @Post("/nativeUserLogin")
    @Tags("User")
    public async nativeUserLogin(@Body() request: NativeUserLoginRequest): Promise<UserLoginResponse> {
        //Checks if user if valid and returns it
        //Creates token and returns details
        
        const user = await this.userService.retrieveNativeUserIfValid(request.email, request.password)
        const sessionToken = await this.userService.createNewUserSessionToken(user.id);
        return {
            accessToken: sessionToken,
            defaultFolder: user.defaultFolderId,
            inbox: user.inboxId
        }
    }
    
    @Get("")
    public async getUser(): Promise<IUser> {
        return await this.userService.getUser(1);
    }


    @Post("/nativeUserSignup")
    @Tags("User")
    public async nativeUserSignUp(@Body() request: IUserCreateProps): Promise<Boolean> {
        //Checks if user if valid and returns it
        //Creates token and returns details
        
        // const user = await this.userService.retrieveNativeUserIfValid(request.email, request.password)
        // const sessionToken = await this.userService.createNewUserSessionToken(user._id);
        // return {
        //     accessToken: sessionToken,
        //     defaultFolder: user.default_folder,
        //     inbox: user.inbox
        // }
        console.log("hit Natvie User Signup")
        try{
            await this.userService.createNewUser({
                email: request.email,
                firstName: request.firstName,
                lastName: request.lastName,
                password: request.password
            })
            return true
        }
        catch(err){
            console.log(err)
            return false
        }
    }

    @Get("/validateSession")
    @Tags("User")
    @Security("api_key")
    public async validateCurrentSession(): Promise<true>{
        console.log("validated Session")
        return true
    }


    private get userService() {
        return new UserService
    }
}