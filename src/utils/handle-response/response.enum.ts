export enum SuccessResponse {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
}

export enum FailResponse {
  INVALID_DATA = 400,
  ACCESS_DENIED = 401,
  UNAUTHORIZED = 403,
  RESOURCE_NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  RESOURCE_EXISTS = 409,
  RESOURCE_GONE = 410,
  PAYLOAD_TOO_LARGE = 413,
  UNSUPPORTED_MEDIA_TYPE = 415,
  TOO_MANY_REQUESTS = 429,
  SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  TEMPORARILY_UNAVAILABLE = 503,
}