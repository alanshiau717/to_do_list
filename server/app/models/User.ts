import { Schema, Document, Model, model, SchemaType } from "mongoose";
import bcrypt from "bcrypt";
import UserSignup from "../../../client/src/models/user.signup";

interface UserSignupDoc extends Document, UserSignup {
  generateHash(password: string): string;
  validPassword(password: string): boolean;
}

const UserSchemaFields: Record<keyof UserSignup, any> = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  activated: { type: Boolean, default: false },
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
