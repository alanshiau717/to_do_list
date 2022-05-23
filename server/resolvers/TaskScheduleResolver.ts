import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { TaskSchedule } from "../database/entity/TaskSchedule";
import { CreateTaskScheduleInput, ModifyTaskScheduleInput } from "../inputs/TaskScheduleInput";
import { ModificationResponse } from "../schemas/ModificationResponse";
import { TaskScheduleService } from "../services/task-schedule-service";

@Resolver()
export class TaskScheduleResolver {
    @Mutation(() => TaskSchedule)
    createTaskSchedule(@Arg("data") data: CreateTaskScheduleInput, @Ctx() ctx: any) {
        if(!ctx.userId) {
            throw "USER NOT AUTHENTICATED"
        }
        return this.taskScheduleService.createTaskSchedule({...data, userId: ctx.userId})
    }
    @Mutation(() => ModificationResponse)
    async modifyTaskSchedule(@Arg("data") data: ModifyTaskScheduleInput, @Ctx() ctx: any) {
        if(!ctx.userId) {
            throw "USER NOT AUTHENTICATED"
        }  
        const taskScheduleId = await this.taskScheduleService.modifyTaskScheduleAndReturnId({...data, userId: ctx.userId})
        return {id: taskScheduleId}
    }

    @Query(() => [TaskSchedule])
    async getTaskSchedules(@Ctx() ctx: any){
        return this.taskScheduleService.getAllTaskScheduleByUserId(ctx.userId)
    }
    private get taskScheduleService() {
        return new TaskScheduleService
    }
}