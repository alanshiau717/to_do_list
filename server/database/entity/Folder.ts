import { Field, ObjectType } from "type-graphql";
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



@ObjectType()
@Entity()
export class Folder extends BaseEntity{
    
    @Field(() => String)
    @Column()
    name: string;

    @Field(() => Boolean)
    @Column( 
    {
        nullable: true,
        default: true
    }
    )
    done: boolean;
    
    @Field(() => Number)
    @Column(
        {
            nullable: true,
            default: 0
        }
    )
    order: number;
    
    @Field(()=> Boolean)
    @Column(
        {
            nullable: true,
            default: false
        }
    )
    isDeleted: boolean
    
    @Field(() => User)
    @ManyToOne(() => User, user=> user.folders)
    user: User;
    
    @Field(() => Number)
    @RelationId((folder: Folder) => folder.user)
    userId: number;
    
    @Field(() => [List])
    @OneToMany(() => List, list=> list.folder)
    lists: List[];
    
    @Field(() => [Number])
    @RelationId((folder: Folder) => folder.lists)
    listIds: number[];
}

