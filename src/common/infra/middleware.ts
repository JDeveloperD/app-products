import { type NextFunction, type Request, type Response } from "express";
import uidValueObject from "../domain/value-objects/uid/uid.value-object";
import { handleErrorResponse } from "../../utils/handle-response";
import { FailResponse } from "./response.enum";
import * as either from "fp-ts/Either";

export function validateParamId(
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | undefined {
  if (req.params.id !== "") {
    const uid = uidValueObject.createUID({ value: req.params.id });

    if (either.isLeft(uid)) {
      return handleErrorResponse(res, {
        kind: FailResponse.INVALID_DATA,
        message: uid.left,
      });
    }
  }
  next();
}

export default {
  validateParamId,
};
