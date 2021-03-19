import { Schema, Document, model } from "mongoose";
import UserSession from "../../../client/src/models/user.session";
interface UserSessionDoc extends Document, UserSession {}

export const UserSessionSchema = new Schema<UserSessionDoc>({
  userId: { type: String, required: true },
  timestamp: { type: Date, default: new Date() },
  isDeleted: { type: Boolean, default: false },
});

const UserSessionMod = model<UserSessionDoc>("UserSession", UserSessionSchema);

export default UserSessionMod;
