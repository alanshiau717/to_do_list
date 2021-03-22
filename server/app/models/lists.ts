import { Document, Schema, model } from "mongoose";
import List from "../../../client/src/models/list";
interface ListDoc extends List, Document {}

export const ListSchema = new Schema({
  name: { type: String, required: true },
  created: { type: Date, required: true },
  user: { type: String, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
  order: { type: Boolean, required: true },
  folder: { type: Boolean, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
});

const ListModel = model<ListDoc>("list", ListSchema);
export { ListModel, ListDoc };
