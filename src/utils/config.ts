import dotenv from "dotenv";
dotenv.config();

export default {
  HOST: process.env.HOST ?? "localhost",
  PORT: process.env.PORT ?? 3000,
  MONGODB_STRING_CONNECTION:
    process.env.MONGODB_STRING_CONNECTION ??
    "mongodb://127.0.0.1:27017/app_products",
  JWT_SECRET_ACCESS_KEY:
    "ZGlydGltcHJvdmVlYXRlbm1lZXRoZWxwZnVsd2l0aGlubWF5YmVrbm93cG9zc2libGU=",
};
