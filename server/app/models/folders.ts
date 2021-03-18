import { Document, Schema, model } from "mongoose";

interface Folder extends Document {
  name: string;
  created: Date;
  done: boolean;
  order: number;
  isDeleted: boolean;
  user: string;
}

export const FolderSchema = new Schema({
  name: { type: String, required: true },
  created: { type: Date, required: true },
  done: { type: Boolean, required: true },
  order: { type: Number, required: true },
  isDeleted: { type: Boolean, required: true },
  user: { type: String, required: true },
});

const FolderModel = model<Folder>("task", FolderSchema);
export default FolderModel;
