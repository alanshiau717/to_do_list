import { Document, Schema, model } from "mongoose";
import Task from "../../../client/src/models/task";

interface TaskDoc extends Document, Task {}

export const TaskSchema = new Schema({
  name: { type: String, required: true },
  created: { type: Date, required: true },
  due: { type: Date, required: false },
  done: { type: Boolean, required: true },
  order: { type: Number, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
  user: { type: String, required: true },
  list: { type: String, required: true },
});

const TaskModel = model<TaskDoc>("task", TaskSchema);

export default TaskModel;
