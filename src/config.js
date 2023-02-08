import fs from "fs";
import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 8080

export const MONGOPORT = "mongodb://127.0.0.1:27017/";
export const MONGODB = "ecommerce";

export const FBServiceAccount = JSON.parse(fs.readFileSync(
  "./data/ecommerce-d09f4-firebase-adminsdk-78exg-9b039216fb.json",
  "utf-8"
)); 

export const DB = process.env.DB || "memory"

// Login

export const admin = true;