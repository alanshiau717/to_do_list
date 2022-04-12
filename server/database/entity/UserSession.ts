import { ObjectType, Field } from "type-graphql";
import {Entity, Column,  ManyToOne} from "typeorm";
import { IBaseEntity, BaseEntity } from "./Base";
import { User, IUser } from "./User";


export interface IUserSessionCreateProps {
    user: number,
}

export interface IUserSession extends IBaseEntity {
    user: IUser
    isRevoked: boolean
}

@ObjectType()
@Entity("UserSession")
export class UserSession extends BaseEntity implements IUserSession{
    @Field(() => User)
    @ManyToOne(() => User, user => user.userSessions)
    user: User;

    @Field(() => Boolean)
    @Column(
        {
            nullable: true,
            default: false
        }
    )
    isRevoked: boolean
} 