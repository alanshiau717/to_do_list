// import { Context } from "apollo-server-core";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
// import { UserLoginResponse } from "../controllers/user-controller";
import { User } from "../database/entity/User";
import {UserRepository} from "../database/repositories/UserRepository"
import { CreateUserInput, GoogleUserLoginInput } from "../inputs/UserInputs";
import { UserLoginResponse } from "../schemas/UserLoginResponse";
import { UserService } from "../services/user-service";
@Resolver()
export class UserResolver {

  @Query(() => [User])
  async getUsers(@Ctx() ctx: any) {
    console.log("hit get users")

    console.log("ctx:",ctx)
    if(ctx.user){
      console.log("user")
    }
    const users = await this.userRepository.find({relations: ["folders", "defaultFolder"]})
    return users
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput): Promise<User> {
      const user = await this.userService.createNewNativeUser({
        ...data
      })
      console.log(user)
      return user
  }
  //TODO: 
  @Mutation(() => UserLoginResponse)
  async googleLogin(@Arg("data") data: GoogleUserLoginInput): Promise<UserLoginResponse | void> {
    console.log("hit googleLogin")
    const validGoogleUser = await this.userService.verifyGoogleAuthToken(data.idToken)
    if(validGoogleUser.email){
        const userLoginResponse = await this.userService.handleValidGoogleUserLogin(validGoogleUser)
        return userLoginResponse;
    }
    throw new Error("Invalid User")
  }

  // @Mutation(() => User)
  // async googleLogin(@Arg("data") idToken: String) : Promise<User> {
  //   const validGoogleUser = await this.userService.verifyGoogleAuthToken(idToken)
  //   if(validGoogleUser.email){
  //     const userLoginResponse = await this.userService.handleValidGoogleUserLogin(validGoogleUser)
  //   }
  // }

  private get userRepository() {
    return new UserRepository();
  }

  private get userService() {
    return new UserService;
  }

}
