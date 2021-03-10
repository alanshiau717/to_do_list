import { setFlagsFromString } from "v8";



module.exports = (mongoose: any) => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
    },
    { timestramps: true }
  );
  schema.method("toJSON", function (this: typeof schema) {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};
