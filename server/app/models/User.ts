import { Schema, Document, Model, model, SchemaType, Types } from "mongoose";
import bcrypt from "bcrypt";
import UserSignup from "../../../client/src/models/shared/user.signup";
import { FolderDoc } from "./folders";
import { ListDoc } from "./lists";

type ID = Types.ObjectId;

interface IUser extends UserSignup {
  default_folder: ID | FolderDoc;
  inbox: ID | ListDoc;
}

interface UserSignupDoc extends Document, IUser {
  generateHash(password: string): string;
  validPassword(password: string): boolean;
}

const UserSchemaFields: Record<keyof IUser, any> = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  activated: { type: Boolean, default: false },
  default_folder: {
    type: Schema.Types.ObjectId,
    ref: "folder",
    required: true,
  },
  inbox: {
    type: Schema.Types.ObjectId,
    req: "list",
    required: true,
  },
};

const UserSchema = new Schema<UserSignupDoc>(UserSchemaFields);

UserSchema.method("generateHash", function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
});
UserSchema.method("validPassword", function (password: string) {
  return bcrypt.compareSync(password, this.password);
});

const UserSignupMod = model<UserSignupDoc>("User", UserSchema);

export default UserSignupMod;
