import { type NextFunction, type Request, type Response } from "express";
import { FailResponse } from "../../common";
import httpError from "http-errors";
import { isDev, isTest } from "../env";

export interface ErrorResponse {
  kind: FailResponse;
  message: string;
}

export function getResponseString(value: number): string | undefined {
  const string = Object.keys(FailResponse).find(
    (key) => FailResponse[key as keyof typeof FailResponse] === value
  );

  return string;
}

export function handleErrorResponse(
  res: Response,
  err: ErrorResponse
): Response {
  return res.status(err.kind).json({
    kind: getResponseString(err.kind),
    message: err.message,
  });
}

export function handleNotFoundRoute(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  next(httpError.NotFound("The route does not exist."));
}

export function generalErrorHandler(
  err: { message: string; status: FailResponse },
  req: Request,
  res: any,
  _next: NextFunction
): Response {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = isDev || isTest ? err : {};

  return handleErrorResponse(res, {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    kind: err.status || 500,
    message: err.message,
  });
}
