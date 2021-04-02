import { Session } from "inspector";
import { Schema, Document, model } from "mongoose";
import UserSession from "../../../client/src/models/user.session";
interface UserSessionDoc extends Document, UserSession {}

const UserSessionSchemaFields: Record<keyof UserSession, any> = {
  userId: { type: String, required: true },
  timestamp: { type: Date, default: new Date() },
  isDeleted: { type: Boolean, default: false },
};

const UserSessionSchema = new Schema<UserSessionDoc>(UserSessionSchemaFields);

const UserSessionMod = model<UserSessionDoc>("UserSession", UserSessionSchema);

export default UserSessionMod;
