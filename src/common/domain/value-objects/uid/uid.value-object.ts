import mongoose from "mongoose";
import * as e from "fp-ts/Either";

const ERROR_INVALID_UUID = "value is not uid";

export type UID = string;

function createUID(props: { value: any }): e.Either<string, UID> {
  if (!isValidUID(props.value)) {
    return e.left(ERROR_INVALID_UUID);
  }

  return e.right(props.value);
}

function isValidUID(id: any): boolean {
  if (typeof id !== "string") {
    return false;
  }

  return (
    mongoose.Types.ObjectId.isValid(id) &&
    new mongoose.Types.ObjectId(id).toString() === id
  );
}

export default {
  createUID,
  isValidUID,
  ERROR_INVALID_UUID,
};
