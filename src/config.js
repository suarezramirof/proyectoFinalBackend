import fs from "fs";
export const envVariable = 2; // 1 = Files, 2 = MongoDB, 3 = Firebase, 4 = Memoria.

export const mongo = "mongodb://127.0.0.1:27017/";

export const firebaseServiceAccount = JSON.parse(fs.readFileSync(
  "./data/ecommerce-d09f4-firebase-adminsdk-78exg-9b039216fb.json",
  "utf-8"
));