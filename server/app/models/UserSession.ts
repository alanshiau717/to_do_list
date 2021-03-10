import { Schema } from "mongoose";

module.exports = (mongoose: any) => {
  var schema = mongoose.Schema({
    userId: {
      type: String,
      default: -1,
    },
    timestamp: {
      type: Date,
      default: Date.now(),
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  });
  const UserSessionSchema = mongoose.model("usersessionschema", schema);
  return UserSessionSchema;
};
