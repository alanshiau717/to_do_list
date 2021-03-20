import { Document, Schema, model } from "mongoose";
import Folder from "../../../client/src/models/folder";

interface FolderDoc extends Document, Folder {}

export const FolderSchema = new Schema({
  name: { type: String, required: true },
  created: { type: Date, required: true },
  done: { type: Boolean, required: true },
  order: { type: Number, required: true },
  isDeleted: { type: Boolean, required: true },
  user: { type: String, required: true },
});

const FolderModel = model<FolderDoc>("folder", FolderSchema);
export default FolderModel;
