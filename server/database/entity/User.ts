import {Entity,  Column,  OneToMany, OneToOne, RelationId, JoinColumn} from "typeorm";
import { Folder, IFolder } from "./Folder";
import { BaseEntity, IBaseEntity } from "./Base";
import { UserSession, IUserSession } from "./UserSession";
import { List, IList } from "./List";

export interface IUserCreateProps {
    firstName?: string;
    lastName?: string;
    email?: string
    password?: string
    defaultFolder?: number
    inbox?: number
    googleUserSub?: string
}


export interface IUser extends IBaseEntity {
    firstName: string;
    lastName: string
    email: string
    password: string
    isDeleted: boolean
    activated: boolean
    folders: IFolder[]
    userSessions: IUserSession[]
    defaultFolder: IFolder
    defaultFolderId: number
    inbox: IList
    inboxId: number
    googleUserSub: string
}

@Entity("User")
export class User extends BaseEntity {
    
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

    @Column(
        {
            nullable: true
        }
    )
    googleUserSub: string
    
    @OneToMany(() => Folder, folder => folder.user)
    folders: Folder[];
    
    @OneToMany(() => UserSession, userSession => userSession.user)
    userSessions: UserSession[];

    @OneToOne(() => Folder, folder => folder.user, {onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn()
    defaultFolder: Folder;
    
    @OneToOne(() => List, list => list.user, {onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinColumn()
    inbox: List;
    
    @RelationId((user: User) => user.defaultFolder)
    defaultFolderId: number

    @RelationId((user: User) => user.inbox)
    inboxId: number

}
