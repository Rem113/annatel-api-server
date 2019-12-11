import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../models/user";
import Keys from "./keys";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Keys.secretOrKey
};

export default passport => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        return done(null, false);
      });
    })
  );
};
