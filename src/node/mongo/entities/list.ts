import { Document, Schema, model, Types } from "mongoose";
import { mongoClientBase } from "./mongoClientBase";
import { ITask, ITaskClient } from "./task";

export default interface List {
    name: string;
    created: Date;
    user: string;
    isDeleted: boolean;
    order: number;
    folder: Types.ObjectId;
  }
  

interface IListClient extends List,mongoClientBase{
    tasks: ITaskClient[]
}

interface IList extends List {
    tasks: ITask[];
}


interface ListDoc extends IList, Document { }

const ListSchemaFields: Record<keyof IList, any> = {
    name: { type: String, required: true },
    created: { type: Date, default: new Date() },
    user: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
    order: { type: Number, required: true },
    folder: { type: Schema.Types.ObjectId, ref: "folder", required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
};

const ListSchema = new Schema<ListDoc>(ListSchemaFields, {versionKey: false});

const ListModel = model<ListDoc>("list", ListSchema);

export { ListModel, ListDoc, IList, IListClient };
