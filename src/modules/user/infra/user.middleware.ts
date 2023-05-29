import passport from "passport";
import { type NextFunction, type Request, type Response } from "express";
import { type Role, type User } from "../domain";

const requireAuth = passport.authenticate("jwt", {
  session: false,
});

const requireRole = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
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

    return res.status(403).json({
      kind: "UNAUTHORIZED",
      error: "You do not have sufficient permissions for this action",
    });
  };
};

const requireAdminRole = requireRole(["ADMIN"]);

export default {
  requireAuth,
  requireRole,
  requireAdminRole,
};
