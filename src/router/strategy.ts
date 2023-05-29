import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import config from "../utils/config";
import { userModule } from "../modules";

function getStrategy(): JwtStrategy {
  return new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET_ACCESS_KEY,
    },
    async function (jwtPayload, done) {
      const user = await userModule.repository.getById(jwtPayload.id);

      if (user === null) {
        done("Error");
        return;
      }

      done(null, user);
    }
  );
}

export default {
  getStrategy,
};
