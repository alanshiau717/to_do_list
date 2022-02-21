// import { EntityRepository } from "typeorm";
import { IUser, IUserCreateProps, User } from "../entity/User";
import { BaseRepository } from "./BaseRepository";




export class UserRepository extends BaseRepository<
  IUser,
  User,
  IUserCreateProps
> {
  constructor() {
    super(User);
  }
}
