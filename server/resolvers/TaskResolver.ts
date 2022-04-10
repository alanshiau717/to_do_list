import { Resolver, Query, Mutation, Arg, Ctx, ArgsType} from "type-graphql";
import {Task} from "../database/entity/Task"
import {CreateTaskInput, ModifyTaskInput} from "../inputs/TaskInputs"
import {TaskService} from "../services/task-service"
@Resolver()
export class TaskResolver {
    // @Query(() => [Task])
    // async tasks() {

    // }
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







}