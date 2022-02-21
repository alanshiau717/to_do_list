import {Entity,  Column,  OneToMany} from "typeorm";
import { Folder } from "./Folder";
import { BaseEntity, IBaseEntity } from "./Base";

export interface IUserCreateProps {
    firstName: string;
    lastName: string;
    email: string
    password?: string
}

export interface IUser extends IUserCreateProps, IBaseEntity {}

@Entity("User")
export class User extends BaseEntity{
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column(
        {
            nullable: true
        }
    )
    password: string;

    @Column(
        {
            nullable: true,
            default: false
        }
    )
    isDeleted: boolean

    @Column(
        {
            nullable: true,
            default: false
        }
    )
    activated: boolean
    
    @OneToMany(() => Folder, folder => folder.user)
    folders: Folder[];
}
