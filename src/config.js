import fs from "fs";
import { config } from "dotenv";
import path from "path";
config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + ".env"),
});
import parseArgs from "minimist";

const USER = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
export const NODE_ENV = process.env.NODE_ENV || "development";

const MONGODB = process.env.MONGODB || "ecommerce";
export const MongoAtlasUri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.zuesfin.mongodb.net/${MONGODB}`;
export const SessionTimeOut = 600000;
const options = {
  alias: {
    p: "PORT",
    m: "MODE",
    d: "DB",
    a: "AUTH"
  },
  default: {
    PORT: process.env.PORT || 8080,
    MODE: "FORK",
    DB: process.env.DB || "mongoDB",
    AUTH: "yes",
  },
};

const commandLineArgs = process.argv.slice(2);

export const { PORT, MODE, DB, AUTH } = parseArgs(commandLineArgs, options);

// export const FBServiceAccount = JSON.parse(
//   fs.readFileSync(
//     "./data/ecommerce-d09f4-firebase-adminsdk-78exg-9b039216fb.json",
//     "utf-8"
//   )
// );

// Login

export const apiKey = process.env.API_KEY || "";

export const keyMode = process.env.NODE_ENV === "production" ? true : false;

export const twilio = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  twilioNumber: process.env.TWILIO_PHONE_NUMBER,
  clientNumber: process.env.FAKE_CLIENT_NUMBER,
  twilioWhatsAppNumber: process.env.TWILIO_WHATSAPP_NUMBER,
  clientWhatsAppNumber: process.env.FAKE_CLIENT_WHATSAPP_NUMBER,
};
