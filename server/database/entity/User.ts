import {Entity,  Column,  OneToMany, OneToOne, RelationId, JoinColumn} from "typeorm";
import { Folder, IFolder } from "./Folder";
import { BaseEntity, IBaseEntity } from "./Base";
import { UserSession, IUserSession } from "./UserSession";
import { List, IList } from "./List";
import { Field, ObjectType } from "type-graphql";

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

@ObjectType()
@Entity("User")
export class User extends BaseEntity {
    @Field(() => String)
    @Column()
    firstName: string;

    @Field(() => String)
    @Column()
    lastName: string;

    @Column()
    @Field(() => String)
    email: string;

    @Column(
        {
            nullable: true
        }
    )
    @Field(() => String)
    password: string;

    @Column(
        {
            nullable: true,
            default: false
        }
    )
    @Field(() => Boolean)
    isDeleted: boolean

    @Column(
        {
            nullable: true,
            default: false
        }
    )
    @Field(() => Boolean)
    activated: boolean

    @Column(
        {
            nullable: true
        }
    )
    @Field(() => String)
    googleUserSub: string
    
    // @OneToMany(() => Folder, folder => folder.user)
    // @Field(()=> [Folder])
    // folders: Folder[];
    
    @OneToMany(() => UserSession, userSession => userSession.user)
    @Field(()=>[UserSession])
    userSessions: UserSession[];

    // @OneToOne(() => Folder, folder => folder.user, {onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    // @JoinColumn()
    // @Field(()=> Folder)
    // defaultFolder: Folder;
    
    // @OneToOne(() => List, list => list.user, {onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    // @Field(()=> List)
    // @JoinColumn()
    // inbox: List;
    
    // @RelationId((user: User) => user.defaultFolder)
    // defaultFolderId: number

    // @RelationId((user: User) => user.inbox)
    // inboxId: number

}
