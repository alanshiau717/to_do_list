import { Document, Schema, model } from "mongoose";

interface List extends Document {
  name: string;
  created: Date;
  user: string;
  isDeleted: boolean;
  order: number;
}

// interface ToDoList extends Array<Task>, Document {
//   name: string;
// }

export const ListSchema = new Schema({
  name: { type: String, required: true },
  created: { type: Date, required: true },
  user: { type: String, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
  order: { type: Boolean, required: true },
});

const ListModel = model<List>("list", ListSchema);
export default ListModel;
