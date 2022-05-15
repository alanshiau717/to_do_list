import { getRepository } from "typeorm";
import { TaskSchedule } from "../database/entity/TaskSchedule";
import { CreateTaskScheduleInput, ModifyTaskScheduleInput } from "../inputs/TaskScheduleInput";
import { removeUndefinedKeys } from "../utils/objectUtils";
import { TaskService } from "./task-service";

interface ICreateTaskSchedule extends CreateTaskScheduleInput {
    userId: number
}

interface IModifyTaskSchedule extends ModifyTaskScheduleInput {
    userId: number
}

export class TaskScheduleService {

    public async createTaskSchedule(payload: ICreateTaskSchedule) {
           if(await this.taskService.taskBelongsToUser(payload.userId, payload.taskId)) {
               let taskSchedule = this.repository.create()
               taskSchedule.taskId = payload.taskId
               taskSchedule.startTime = payload.startTime
               taskSchedule.endTime = payload.endTime
               taskSchedule.isAllDayEvent = payload.isAllDayEvent
               taskSchedule.userId = payload.userId
               return await this.repository.save(taskSchedule)
           }
           throw "INTERNAL SERVER ERROR"
    }

    public async modifyTaskScheduleAndReturnId(payload: IModifyTaskSchedule) {
            const {userId, id, ...modifyTaskScheduleProps} = payload
            if(await this.taskScheduleBelongsToUser(userId, id)) {
                removeUndefinedKeys(modifyTaskScheduleProps)
                await this.repository.update({id: id}, {...modifyTaskScheduleProps})
                return id
            }
            throw "TASK SCHEDULE DOESN'T BELONG TO USER"
    }

    public async taskScheduleBelongsToUser(userId: number, taskScheduleId: number) {
        const taskSchedule = await this.repository.findOne(taskScheduleId)
        if(taskSchedule) {
            if(taskSchedule.userId == userId) {
                return true
            }
        }
        return false
    }

    public async getAllTaskScheduleByUserId(userId: number) {
        const taskSchedule = await this.repository.find({relations: ["tasks"],where: {userId: userId}})
        return taskSchedule
    }

    private get repository() {
        return getRepository(TaskSchedule)
    }

    private get taskService() {
        return new TaskService()
    }
}