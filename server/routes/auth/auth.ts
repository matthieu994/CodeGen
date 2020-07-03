/* eslint-disable @typescript-eslint/camelcase */
import passport from "passport";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { Router, Request } from "express";
import { User, IUser, UserType } from "../../models/User";
import fs from "fs";
const routes = require("../routes.json");

export interface IRequestUser extends Request {
  user: IUser;
}

let allLinks = [];

// Checks if user is one of the types specified
// Default to "all" authentication
function isType(req, res, next, roles?: Array<UserType>) {
  if (!roles) return next();
  if (!roles.includes(req.user.type)) res.status(400).send("USER_TYPE_ERROR");
  else next();
}

// On /api/auth
module.exports = function (auth: Router) {
  // Check jwt authentication
  auth.use(passport.authenticate("jwt", { session: false }));

  // Authentify user
  auth.post("/", (_req: IRequestUser, res) => {
    res.sendStatus(200);
  });

  // Send links which users has access to
  auth.post("/links", (req: IRequestUser, res) => {
    if (routes[req.user.type][0] === "*") {
      if (allLinks.length < 1)
        allLinks = fs
          .readdirSync("./models/")
          .filter((file) => fs.statSync("./models/" + file).isDirectory());

      return res.status(200).send({
        links: allLinks,
      });
    }
    return res.status(200).send({
      links: req.user.type ? routes[req.user.type] : [],
    });
  });

  // Example admin API endpoint with isType middleware
  auth.post(
    "/admin",
    (req, res, next) => isType(req, res, next, [UserType.ADMIN]),
    (req: IRequestUser, res) => {
      res.send(`authentified as ${req.user.type} on /auth/admin`);
    }
  );
};

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    },
    function (token, done) {
      User.findById(token.user._id, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);
