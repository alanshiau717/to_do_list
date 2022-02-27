import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../database/entity/User";
import {UserRepository} from "../database/repositories/UserRepository"
import { CreateUserInput } from "../inputs/UserInputs";
import { UserService } from "../services/user-service";
@Resolver()
export class UserResolver {

  @Query(() => [User])
  async hello() {
    const users = await this.userRepository.find({relations: ["folders", "defaultFolder"]})
    return users
  }

  @Mutation(() => Boolean)
  async createUser(@Arg("data") data: CreateUserInput) {
    try{
      await this.userService.createNewUser({
        ...data
      })
      return true
    }
    catch(err){
      console.log(err)
      return false
    }
    
  }

  private get userRepository() {
    return new UserRepository();
  }

  private get userService() {
    return new UserService;
  }

}
