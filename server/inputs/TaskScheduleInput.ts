import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTaskScheduleInput {

    @Field(() => Number)
    taskId: number

    @Field(() => Date)
    startTime: Date

    @Field(() => Date)
    endTime: Date

    @Field(() => Boolean)
    isAllDayEvent: boolean
}


@InputType()
export class ModifyTaskScheduleInput {
    @Field()
    id: number

    @Field({ nullable: true })
    startTime?: Date

    @Field({ nullable: true })
    endTime?: Date

    @Field({ nullable: true })
    isAllDayEvent?: boolean

    @Field({nullable: true})
    isDeleted?: boolean
}