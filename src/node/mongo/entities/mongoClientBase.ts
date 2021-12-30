import { Types } from "mongoose";

export interface mongoClientBase {
    _id: Types.ObjectId;
}