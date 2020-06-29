import { Router } from "express";

module.exports = function (api: Router) {
  api.post("/logout", function (req, res) {
    req.logout();
    res.sendStatus(200);
  });
};
