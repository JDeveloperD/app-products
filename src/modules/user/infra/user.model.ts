import type mongoose from "mongoose";
import { model, Schema } from "mongoose";
import { Roles, type User } from "../domain";
import paginate from "mongoose-paginate-v2";

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
      default: true,
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
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

UserSchema.plugin(paginate);

const UserModel = model<User, mongoose.PaginateModel<User>>("user", UserSchema);

export default UserModel;
