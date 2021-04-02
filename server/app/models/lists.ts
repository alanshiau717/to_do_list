import { Document, Schema, model, Types } from "mongoose";
import List from "../../../client/src/models/list";
import { TaskDoc } from "./tasks";
import { FolderDoc } from "./folders";
type ID = Types.ObjectId;

interface IList extends List {
  tasks: ID[] | TaskDoc[];
  folder: ID | FolderDoc;
}
interface ListDoc extends IList, Document {}

const ListSchemaFields: Record<keyof IList, any> = {
  name: { type: String, required: true },
  created: { type: Date, default: new Date() },
  user: { type: String, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
  order: { type: Number, required: true },
  folder: { type: Schema.Types.ObjectId, ref: "folder", required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
};

const ListSchema = new Schema<ListDoc>(ListSchemaFields);

const ListModel = model<ListDoc>("list", ListSchema);

export { ListModel, ListDoc };
