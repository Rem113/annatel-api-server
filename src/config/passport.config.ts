import { PassportStatic } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.model";
import Keys from "./keys";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Keys.secretOrKey,
};

export default (passport: PassportStatic): PassportStatic =>
  passport.use(
    new Strategy(opts, (payload: any, done: any) => {
      User.findById(payload.id, (err: any, user: any) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        return done(null, false);
      });
    })
  );
