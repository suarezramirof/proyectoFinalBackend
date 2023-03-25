import fs from "fs";
import { config } from "dotenv";
config();
import parseArgs from "minimist";

const USER = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

export const MONGOPORT = "mongodb://127.0.0.1:27017/";
export const MONGODB = "ecommerce";
export const MongoAtlasUri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.zuesfin.mongodb.net/${MONGODB}`;
export const SessionTimeOut = 600000;
const options = {
  alias: {
    p: "PORT",
    m: "MODE",
  },
  default: {
    PORT: process.env.PORT || 8080,
    MODE: "FORK",
  },
};

const commandLineArgs = process.argv.slice(2);

export const { PORT, MODE } = parseArgs(commandLineArgs, options);

export const FBServiceAccount = JSON.parse(
  fs.readFileSync(
    "./data/ecommerce-d09f4-firebase-adminsdk-78exg-9b039216fb.json",
    "utf-8"
  )
);

export const DB = process.env.DB || "memory";

// Login

export const admin = true;
