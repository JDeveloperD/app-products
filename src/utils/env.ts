import config from "./config";

export const isDev = config.ENV === "development";
export const isProd = config.ENV === "production";
export const isTest = config.ENV === "test";
