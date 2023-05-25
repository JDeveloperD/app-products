import dotenv from "dotenv";
dotenv.config();

export default {
  HOST: process.env.HOST ?? "localhost",
  PORT: process.env.PORT ?? 3000,
  MONGODB_STRING_CONNECTION: process.env.MONGODB_STRING_CONNECTION ?? "any",
};
