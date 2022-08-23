import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { IBaseEntity, BaseEntity } from "./Base";
import {User} from "./User"
import {Folder, IFolder} from "./Folder"
import { Field, ObjectType } from "type-graphql";
import { Task } from "./Task";

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
    @ManyToOne(() => User)
    @JoinColumn({name:"userId"})
    user: User;

    @Column({type: "int", nullable: true})
    userId: number;
    
    @Field(() => Folder)
    @ManyToOne(()=> Folder)
    @JoinColumn({name:"folderId"})
    folder: Folder

    @Field(() => Number)
    @Column({type: "int", nullable: true})
    folderId: number;

    @Field(() => [Task])
    @OneToMany(() => Task, task => task.list)
    tasks: Task[];

}


