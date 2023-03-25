import session from "express-session";
import MongoStore from "connect-mongo";
import { MongoAtlasUri, SessionTimeOut } from "../config.js";

const sessionMiddleware = session({
    store: MongoStore.create({
      mongoUrl: MongoAtlasUri,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "ecommerce_secret_app",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: SessionTimeOut,
    },
  });

  export default sessionMiddleware;