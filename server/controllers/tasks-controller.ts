// import { Get, Route, Tags } from "tsoa";
// // import { ListService } from "../services/list-service";
// // import { ITask } from "../../node/mongodb/repositories/taskRepository";
// import { TaskDoc } from "../../node/mongo/entities/task";

// export type Task =  Pick<TaskDoc, "name"| "created" | "due" | "done" | "order" | "isDeleted" | "user" | "list">

// // @Route("task")
// // export class ListController {
// //     /**
// //    * @isInt task_id user_id must be a positive integer
// //    * @minimum task_id 1
// //    */
// //     // @Get()
// //     // @Tags("Lists")
// //     // public async GetUsers(): Promise<IList[]> {
// //     //     return this.service.get();
// //     // }


// //     // private get service() {
// //     //     return new ListService();
// //     // }
// // }