import { model, Schema } from "mongoose";
import { type User, Roles } from "../domain/user.entity";

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Roles,
      default: "CLIENT",
    },
    isTheEmailConfirmed: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    acceptedTerm: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const UserModel = model("user", UserSchema);

export default UserModel;
