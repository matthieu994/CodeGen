import { Router } from "express";
import passport from "passport";
import { User, IUser } from "../../models/User";
import { Strategy as localStrategy } from "passport-local";
import { Error } from "mongoose";

module.exports = function (api: Router) {
  api.post("/signup", async (req, res, next) => {
    passport.authenticate("signup", { session: false }, async (err, user: IUser, info) => {
      try {
        // Return err for debug
        if (err || !user) return res.status(401).json({ err, info });

        return res.json({
          info: { message: "SIGNUP_SUCCESS" },
          email: user.email,
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });

  passport.use(
    "signup",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { firstname, lastname, phone, passwordCheck, type } = req.body;
          if (passwordCheck !== password) return done(null, false, { message: "PASSWORD_ERROR" });

          const user = { firstname, lastname, phone, email, password, type };
          User.create(user, (err, createdUser) => {
            if (err) {
              if (err instanceof Error.ValidationError)
                return done(err, false, { message: "MISSING_FIELDS" });
              else if (err.code === 11000) return done(null, false, { message: "USER_EXISTS" });
              else return done(err, false, { message: "unexpected error" });
            }
            return done(null, createdUser);
          });
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
