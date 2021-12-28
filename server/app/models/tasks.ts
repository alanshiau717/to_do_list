import { Document, Schema, model, Types } from "mongoose";
import Task from "../../../client/src/models/shared/task";
import { ListDoc } from "./lists";
type ID = Types.ObjectId;

//We are extending our frontend task interface with the list key
//which is a list of ObjectIds or Documents
interface ITask extends Task {
  list: ID | ListDoc;
}

//We Then further extend it to a mongoose document
interface TaskDoc extends Document, ITask { }

const TaskSchemaFields: Record<keyof ITask, any> = {
  name: { type: String, required: true },
  created: { type: Date, required: true },
  due: { type: Date, required: false },
  done: { type: Boolean, required: true },
  order: { type: Number, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
  user: { type: String, required: true },
  list: { type: Schema.Types.ObjectId, ref: "list", required: true },
  // scheduledDateTime: { type: Date, required: false }
};

const TaskSchema = new Schema<TaskDoc>(TaskSchemaFields);

const TaskModel = model<TaskDoc>("task", TaskSchema);

export { TaskModel, TaskDoc };
