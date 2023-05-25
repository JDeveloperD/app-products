import { model, type InferSchemaType, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    isTheEmailConfirmed: { type: Boolean },
    isActive: { type: Boolean },
    acceptedTerm: { type: Boolean },
  },
  { timestamps: true }
);

export type UserModel = InferSchemaType<typeof UserSchema>;

const userModel = model<UserModel>("user", UserSchema);

export default userModel;
