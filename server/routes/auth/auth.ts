/* eslint-disable @typescript-eslint/camelcase */
import passport from "passport";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { Router, Request } from "express";
import { User, IUser, UserType } from "../../models/User";

export interface IRequestUser extends Request {
  user: IUser;
}

// Checks if user has one of the role specified in roles
// Default to "all" authentication
export const hasRole = (req, res, next, roles?: Array<UserType>) => {
  if (!roles) return next();
  if (!roles.includes(req.user.type)) res.status(400).send("ROLE_ERROR");
  else next();
};

// On /api/auth
module.exports = function (auth: Router) {
  // Check jwt authentication
  auth.use(passport.authenticate("jwt", { session: false }));

  // Authentify user as one of the role provided
  auth.post("/", (req: IRequestUser, res) => {
    res.status(200).send({ type: req.user.type });
  });

  // Send links which users has access to
  auth.post("/links", (req: IRequestUser, res) => {
    if (req.user.type == UserType[UserType.SUPER_ADMIN])
      return res.status(200).send({
        type: req.user.type,
        links: [
          "ad_campaign",
          "algo_scoring",
          "brand",
          "company",
          "product",
          "report",
          "report_event",
          "screen",
          "shop",
          "ticket",
          "ticket_scanner",
          "viewer",
        ],
      });
    else return res.status(200).send({ type: req.user.type, links: [] });
  });

  // Example API endpoint with hasRole middleware
  auth.post(
    "/test",
    (req, res, next) => hasRole(req, res, next, [UserType.SUPER_ADMIN]),
    (req: IRequestUser, res) => {
      res.send(`authentified as ${req.user.type} on /auth/test`);
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
      User.findOne({ id: token.sub }, function (err, user) {
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
