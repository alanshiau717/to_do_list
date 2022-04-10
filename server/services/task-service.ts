// import {TaskModel} from "../../node/mongo/entities/task"

import { getRepository } from "typeorm";
import { string } from "yargs";
import { ITaskCreateProps, Task } from "../database/entity/Task";
import { ListService } from "./list-service";

// export class TaskService {
//     public async getUserLists() {
           
//     }

//     private get repository() {
//         return TaskModel;
//     }
// }

export class TaskService {

    public async createTask(request: ITaskCreateProps): Promise<Task> {
        if (await this.listService.listBelongsToUser(request.user, request.list)){
            let task = this.repository.create();
            task.name = request.name
            task.userId = request.user
            task.listId = request.list
            return await this.repository.save(task)
        }
        throw "INTERNAL SERVER ERROR"
    }

    public async taskBelongsToUser(userId: number, taskId: number) {
        const task = await this.repository.findOne(taskId)
        if(task) {
            if (task.userId == userId) {
                return true
            }
        }
        return false
    }

    public async modifyTaskAndReturnId(userId: number, payload: M)

    private get repository() {
        return getRepository(Task)
    }

    private get listService() {
        return new ListService();
    }
    
}