import passport from "passport";
import { type NextFunction, type Request, type Response } from "express";
import { ERROR_NOT_PERMISSIONS, type Role, type User } from "../domain";
import { handleErrorResponse } from "../../../utils/handle-response/handle-response";
import { FailResponse } from "../../../utils/handle-response/response.enum";

const requireAuth = passport.authenticate("jwt", {
  session: false,
});

const requireRole =
  (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    if (user.role === "DEVELOPER") {
      next();
      return;
    }

    const hasAccess = roles.includes(user.role);

    if (hasAccess) {
      next();
      return;
    }

    handleErrorResponse(res, {
      kind: FailResponse.UNAUTHORIZED,
      message: ERROR_NOT_PERMISSIONS,
    });
  };

const requireAdminRole = requireRole(["ADMIN"]);

export default {
  requireAuth,
  requireRole,
  requireAdminRole,
};
