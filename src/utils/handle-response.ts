import { type Response } from "express";
import { FailResponse } from "../common/infra/response.enum";

export interface ErrorResponse {
  kind: FailResponse;
  message: string;
}

export function handleErrorResponse(
  res: Response,
  err: ErrorResponse
): Response {
  function getResponseString(value: number): string | undefined {
    const string = Object.keys(FailResponse).find(
      (key) => FailResponse[key as keyof typeof FailResponse] === value
    );

    return string;
  }

  return res.status(err.kind).json({
    kind: getResponseString(err.kind),
    message: err.message,
  });
}
