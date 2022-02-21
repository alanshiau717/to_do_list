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

@Entity("UserSession")
export class UserSession extends BaseEntity implements IUserSession{
    
    @ManyToOne(() => User, user => user.userSessions)
    user: User;

    @Column(
        {
            nullable: true,
            default: false
        }
    )
    isRevoked: boolean
    
} 