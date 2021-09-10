import express from "express";
import passport from "passport";

// This midleware is use to protect route
// Trigger jwt validation and decide what action to take if validation success or validation fail

//include configuration
require("../config/auth.config");

export const authMiddleware = (
  req: express.Request,
  res: express.Response,
  next: any
) => {
  passport.authenticate("jwt", {}, function (err: any, user: any, info: any) {
    if (!user || err) {
      return res.status(401).send({
        message: "Unauthorized access, please login to access the API.",
      });
    } else {
      next();
    }
  })(req, res, next);
};
