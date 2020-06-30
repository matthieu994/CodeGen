import { Router } from "express";
import passport from "passport";
import { User, IUser } from "../../models/User";
import { Strategy as localStrategy } from "passport-local";
import jwt from "jsonwebtoken";

module.exports = function (api: Router) {
  api.post("/login", async (req, res, next) => {
    passport.authenticate("login", { session: false }, async (err, user: IUser, info) => {
      try {
        if (err || !user) return res.status(401).json({ info });

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) return done(null, false, { message: "USER_NOT_FOUND" });

          const validate = await user.isValidPassword(password);
          if (!validate) return done(null, false, { message: "BAD_PASSWORD" });

          return done(null, user, { message: "LOGGED_IN" });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
