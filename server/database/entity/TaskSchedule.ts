import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import { BaseEntity } from "./Base";
import { Task } from "./Task"; 
import { User } from "./User";

@ObjectType()
@Entity()
export class TaskSchedule extends BaseEntity {
    @Field(() => Task)
    @ManyToOne( () => Task)
    @JoinColumn({name: "taskId"})
    tasks: Task;

    @Field(() => Number)
    @Column({type: "int"})
    taskId: number

    @Field(() => User)
    @ManyToOne(() => User)
    @JoinColumn({name:"userId"})
    user: User;

    @Column({type: "int", nullable: true})
    userId: number

    @Field(() => Date)
    @Column()
    startTime: Date

    @Field(() => Date)
    @Column()
    endTime: Date

    @Field(() => Boolean)
    @Column()
    isAllDayEvent: boolean
}