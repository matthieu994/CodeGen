const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        exclude: [path.resolve(__dirname, "node_modules")],
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        exclude: [path.resolve(__dirname, "node_modules")],
        test: /\.(graphql|gql)$/,
        loader: "graphql-tag/loader",
      },
    ],
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: "node",
};
