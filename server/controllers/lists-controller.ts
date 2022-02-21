// import { Get, Route, Tags } from "tsoa";
// import { ListService } from "../services/list-service";
// // import { ITask } from "../../node/mongodb/repositories/taskRepository";
// import { IList, ListDocPopulated } from "../../node/mongo/entities/list";
// import {Task} from "./tasks-controller"
// export interface ListPopulated extends Pick<ListDocPopulated, "name" | "created" | "user" | "isDeleted" | "order" | "folder"> {
//     tasks: Task[] 
// }

// @Route("list")
// export class ListController {
//     /**
//    * @isInt task_id user_id must be a positive integer
//    * @minimum task_id 1
//    */
//     @Get()
//     @Tags("Lists")
//     public async GetUsers(): Promise<IList[]> {
//         return this.service.get();
//     }


//     private get service() {
//         return new ListService();
//     }
// }