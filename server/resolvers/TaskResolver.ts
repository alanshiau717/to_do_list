import { Resolver, Mutation, Arg, Ctx, Query} from "type-graphql";
import {Task} from "../database/entity/Task"
import {CreateTaskInput, ModifyTaskInput} from "../inputs/TaskInputs"
import { ModificationResponse } from "../schemas/ModificationResponse";
import {TaskService} from "../services/task-service"
@Resolver()
export class TaskResolver {
    @Mutation(() => Task)
    createTask(@Arg("data") data: CreateTaskInput, @Ctx() ctx: any) {
        if(!ctx.userId) {
            throw "USER NOT AUTHENTICATED"
        }
        return this.taskService.createTask({...data, user:ctx.userId})
    }

    private get taskService() {
        return new TaskService
    }

    @Mutation(() => ModificationResponse)
    async modifyTask(@Arg("data") data: ModifyTaskInput, @Ctx() ctx: any) {
        if(!ctx.userId) {
            throw "USER NOT AUTHENTICATED"
        }
        const taskId = await this.taskService.modifyTaskAndReturnId(ctx.userId, data)
        return {id: taskId}
    }


    @Query(() => Task)
    async task(
        @Ctx() ctx: any,
        @Arg("taskId") taskId: number) {
        if(!ctx.userId) {
            throw "USER NOT AUTHENTICATED"
        }
        return this.taskService.getTask(ctx.userId, taskId)
    }
}