import { Document, Schema, model, Types } from "mongoose";
import Folder from "../../../client/src/models/folder";
import { ListDoc } from "./lists";
type ID = Types.ObjectId;
interface IFolder extends Folder {
  lists: ID[] | ListDoc[];
}
interface FolderDoc extends Document, IFolder {}

const FolderSchemaFields: Record<keyof IFolder, any> = {
  name: { type: String, required: true },
  created: { type: Date, default: new Date() },
  done: { type: Boolean, default: false },
  order: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  user: { type: String, required: true },
  lists: [{ type: Schema.Types.ObjectId, ref: "list" }],
};

const FolderSchema = new Schema<FolderDoc>(FolderSchemaFields);

const FolderModel = model<FolderDoc>("folder", FolderSchema);
export { FolderModel, FolderDoc };
