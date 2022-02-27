import { Entity, Column, ManyToOne } from "typeorm";
import { IBaseEntity, BaseEntity } from "./Base";
import {User} from "./User"
import {Folder, IFolder} from "./Folder"
import { Field, ObjectType } from "type-graphql";

export interface IListCreateProps{
    name: string,
    user: number,
    folder: number
}
export interface IList extends IBaseEntity {
    name: string,
    // user: User,
    folder: IFolder
    order: number
    isDeleted: boolean
}

@ObjectType()
@Entity()
export class List extends BaseEntity implements IList{
    @Field(() => String)
    @Column()
    name: string;

    @Field(() => Boolean)
    @Column(
        {
            nullable: true,
            default: false
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
    
    @Field(() => Boolean)
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
    
    @Field(() => [Folder])
    @ManyToOne(()=> Folder, folder=> folder)
    folder: Folder
}

