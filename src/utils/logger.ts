import morgan from "morgan";
import { isDev, isTest } from "./env";

const options =
  isDev || isTest
    ? "dev"
    : ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
const init = (): any => morgan(options);

export default { init };
