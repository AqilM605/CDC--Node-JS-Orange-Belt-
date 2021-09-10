const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTstrategy = require("passport-jwt").Strategy;
import User from "../models/user.model";
import passport from "passport";

//dummy users auth

//Extract token from header and find the user
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SIGN_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token: any, done: any) => {
      User.findOne({ emailAddress: token.user.emailAddress })
        .then(async (data: any) => {
          return done(null, data);
        })
        .catch((error: any) => {
          return done(error);
        });
    }
  )
);
