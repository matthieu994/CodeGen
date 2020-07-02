import { Router } from "express";
import passport from "passport";
import { User, IUser, IUserCreate } from "../../models/User";
import { Strategy as localStrategy } from "passport-local";
import { Error } from "mongoose";

module.exports = function (api: Router) {
  api.post("/signup", async (req, res, next) => {
    passport.authenticate("signup", { session: false }, async (err, user: IUser, info) => {
      if (err || !user) {
        if (err instanceof Error.ValidationError)
          res.status(401).send({ err, info: { message: "MISSING FIELDS" } });
        else if (err.code === 11000)
          res.status(401).send({ err, info: { message: "USER EXISTS" } });
        else res.status(401).send({ err, info: { message: "UNEXPECTED ERROR" } });
      } else if (user)
        return res.send({
          info,
          email: user.email,
        });
      else return next(err);
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
      async (req, email, password, callback) => {
        try {
          const { firstname, lastname, passwordCheck } = req.body;
          if (passwordCheck !== password)
            return callback(null, null, { message: "PASSWORD ERROR" });

          const user = { firstname, lastname, email, password, type: "USER" };
          User.create(user, (error, createdUser) => {
            if (error) callback(error, null);
            else callback(null, createdUser, { message: "SIGNUP SUCCESS" });
          });
        } catch (error) {
          callback(error, null);
        }
      }
    )
  );
};
