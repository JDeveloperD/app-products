import mongoose from "mongoose";

export type UID = mongoose.Types.ObjectId;

export function isValidUID(id: any): boolean {
  if (typeof id !== "string") {
    return false;
  }

  if (mongoose.Types.ObjectId.isValid(id)) {
    return String(new mongoose.Types.ObjectId(id)) === id;
  }

  return false;
}

export function createUID(id: any): UID {
  return new mongoose.Types.ObjectId(id);
}
