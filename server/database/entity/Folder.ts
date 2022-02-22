import { Entity, Column,  ManyToOne, OneToMany
    , RelationId 
} from "typeorm";
import { IBaseEntity, BaseEntity } from "./Base";
import { List, IList } from "./List";
import {User} from "./User"

export interface IFolderCreateProps{
    name: string,
    user: number
}

export interface IFolder extends IBaseEntity {
    order: number
    isDeleted: boolean
    // user: IUser
    userId: number
    name: string
    done: boolean
    lists: IList[]
    listIds: number[]
}




@Entity()
export class Folder extends BaseEntity{
    
    @Column()
    name: string;

    @Column( 
    {
        nullable: true,
        default: true
    }
    )
    done: boolean;
    
    @Column(
        {
            nullable: true,
            default: 0
        }
    )
    order: number;

    @Column(
        {
            nullable: true,
            default: false
        }
    )
    isDeleted: boolean
    
    @ManyToOne(() => User, user=> user.folders)
    user: User;

    @RelationId((folder: Folder) => folder.user)
    userId: number;

    @OneToMany(() => List, list=> list.folder)
    lists: List[];

    @RelationId((folder: Folder) => folder.lists)
    listIds: number[];
}

