import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import config from "../../utils/config";
import { userModule } from "../../modules";
import { FailResponse } from "../../common";

function getJwtStrategy(): JwtStrategy {
  return new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET_ACCESS_KEY,
    },
    async function (jwtPayload, done) {
      const user = await userModule.repository.getById(jwtPayload.id);

      if (user === null) {
        done({
          kind: FailResponse.ACCESS_DENIED,
          message: "invalid credentials",
        });

        return;
      }

      done(null, user);
    }
  );
}

export default {
  getJwtStrategy,
};
