import { Document, Schema, model} from "mongoose";
import { IListClient } from "./list";
import { mongoClientBase } from "./mongoClientBase";
import { Types } from "mongoose";
// import Base from "../base"
// import { ListDoc } from "./list";

export default interface BaseFolder {
    name: string;
    created: Date;
    done: boolean;
    order: number;
    isDeleted: boolean;
    user: string;
}

interface IFolderClient extends BaseFolder,mongoClientBase {
    lists: IListClient[]
}

interface IFolderClientCreate extends BaseFolder, mongoClientBase {
    lists: Types.ObjectId[]
}

interface IFolder extends BaseFolder {
    lists: Types.ObjectId[] 
}

interface FolderDoc extends Document, IFolder { }

const FolderSchemaFields: Record<keyof IFolder, any> = {
    name: { type: String, required: true },
    created: { type: Date, default: new Date() },
    done: { type: Boolean, default: false },
    order: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    user: { type: String, required: true },
    lists: [{ type: Schema.Types.ObjectId, ref: "list" }],
};

const FolderSchema = new Schema<FolderDoc>(FolderSchemaFields, {versionKey: false});

const FolderModel = model<FolderDoc>("folder", FolderSchema);
export { FolderModel, FolderDoc, IFolder, IFolderClient, IFolderClientCreate };
