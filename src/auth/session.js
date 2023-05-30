import session from "express-session";
import MongoStore from "connect-mongo";
import FileStore from "session-file-store";
import { MongoAtlasUri, SessionTimeOut } from "../config.js";
import { DB } from "../config.js";

const fileStoreOptions = {
  path: "./data/sessions",
  ttl: SessionTimeOut / 1000,
};

const RealFileStore = FileStore(session);

const MongoStoreOptions = {
  mongoUrl: MongoAtlasUri,
  mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
};

const sessionMiddleware = session({
  store: DB === "mongoDB" ? MongoStore.create(MongoStoreOptions) : new RealFileStore(fileStoreOptions),
  secret: "ecommerce_secret_app",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: SessionTimeOut,
  },
});

export default sessionMiddleware;
