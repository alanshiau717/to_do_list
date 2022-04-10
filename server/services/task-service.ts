// import {TaskModel} from "../../node/mongo/entities/task"

import { getRepository } from "typeorm";
import { string } from "yargs";
import { ITaskCreateProps, Task } from "../database/entity/Task";
import { ModifyTaskInput } from "../inputs/TaskInputs";
import { FolderService } from "./folder-service";
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

    public async modifyTaskAndReturnId(userId: number, payload: ModifyTaskInput) {
        const {id, ...modifyTaskProps} = payload
        if((await this.taskBelongsToUser(userId, id) && (await this.isValidTaskModification(userId, payload)))) {
            await this.repository.update({id: id}, {...modifyTaskProps})
            return id
        }
    }

    private async isValidTaskModification(userId: number, payload: ModifyTaskInput) {
        if(payload.listId){
            return await this.folderService.folderBelongsToUser(userId, payload.listId)
        }
        return "FOLDER DOESN'T BELONG TO USER"
    }

    private get repository() {
        return getRepository(Task)
    }

    private get listService() {
        return new ListService();
    }
    private get folderService() {
        return new FolderService();
    }
    
}