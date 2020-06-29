import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import { ApolloServer } from "apollo-server-express";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/ebnscreennetwork", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.set("useCreateIndex", true);
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("Dev-MongoDB database connected");
});

// Core API : login, signup and logout
const api = express.Router();
app.use("/api", api);
require("./routes/user/login")(api); // /api/login
require("./routes/user/signup")(api); // /api/signup
require("./routes/user/logout")(api); // /api/logout

// JWT Protected Routes Strategy and check auth of user
const authRouter = express.Router();
app.use("/api/auth", authRouter);
require("./routes/auth/auth")(authRouter);

/* Add user token to GraphQL context */
import schema from "./graphql/schema";
import jwt from "jsonwebtoken";
const server: ApolloServer = new ApolloServer({
  schema,
  context: async ({ req }) => {
    try {
      const token = req.headers.authorization || "";
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      return { _id: decoded.user._id };
    } catch (error) {
      return {};
    }
  },
});
server.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
