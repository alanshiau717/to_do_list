import { Entity, Column, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity} from "./Base";
import { User } from "./User";
import { List } from "./List";
import { TaskSchedule } from "./TaskSchedule";

export interface ITaskCreateProps{
    name: string,
    user: number,
    list: number
}

@ObjectType()
@Entity()
export class Task extends BaseEntity {
    @Field(() => String)
    @Column()
    name: string;

    @Field(()=> Date, {nullable: true})
    @Column(
        {
            nullable: true
        }
    )
    due?: Date;

    @Field(()=> [TaskSchedule])
    @OneToMany(() => TaskSchedule, taskSchedule => taskSchedule.tasks)
    @JoinColumn({name:"taskScheduleId"})
    taskSchedule: TaskSchedule[]

    @Column({type: "int", nullable: true})
    taskScheduleId: number;

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

    @Field(() => List)
    @ManyToOne(() => List, list => list.tasks)
    @JoinColumn({name: "listId"})
    list: List;

    @Column({type: "int", nullable: true})
    listId: number;

    @Field(() => Boolean)
    @Column(
        {
            nullable: true,
            default: false
        }
    )
    done: boolean

    @Field(
        () => String, {nullable: true})
    @Column(
        {
            type: "text",
            nullable: true
        }
    )
    description?: string

}