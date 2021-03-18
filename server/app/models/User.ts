import { Schema, Document, Model, model } from "mongoose";
import bcrypt from "bcrypt";
import UserSignup from "../../../client/src/models/user.signup";

interface UserSignupDoc extends Document, UserSignup {
  generateHash(password: string): string;
  validPassword(password: string): boolean;
}

export const UserSchema = new Schema<UserSignupDoc>({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  isDeleted: { type: Boolean, default: false },
  activated: { type: Boolean, default: false },
});

UserSchema.method("generateHash", function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
});
UserSchema.method("validPassword", function (password: string) {
  return bcrypt.compareSync(password, this.password);
});

const UserSignupMod = model<UserSignupDoc>("User", UserSchema);

export default UserSignupMod;

// module.exports = (mongoose: any) => {
//   var schema = mongoose.Schema({
//     firstName: { type: String, default: "" },
//     lastName: { type: String, default: "" },
//     email: { type: String, default: "" },
//     password: { type: String, default: "" },
//     isDeleted: { type: Boolean, default: false },
//     activated: { type: Boolean, default: false },
//   });
//   schema.method("generateHash", function (password: string) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
//   });
//   schema.method(
//     "validPassword",
//     function (this: typeof schema, password: string) {
//       return bcrypt.compareSync(password, this.password);
//     }
//   );
//   const UserSchema = mongoose.model("userschema", schema);
//   return UserSchema;
// };
