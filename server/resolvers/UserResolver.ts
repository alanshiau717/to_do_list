import { Resolver, Query } from "type-graphql";
import { User } from "../database/entity/User";
import {UserRepository} from "../database/repositories/UserRepository"
@Resolver()
export class UserResolver {

  @Query(() => [User])
  async hello() {
    const users = await this.userRepository.find({})
    return users
  }


  private get userRepository() {
    return new UserRepository();
}
}