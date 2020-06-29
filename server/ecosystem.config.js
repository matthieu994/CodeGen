/* eslint-disable */
require("dotenv").config();

module.exports = {
  apps: [
    {
      name: process.env.EBN_APP_NAME || "interfaceweb-backend",
      script: "node",
      args: "build/index.js",
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
    },
  ],
};
