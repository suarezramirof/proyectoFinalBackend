import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  userData: {
    name: String,
    address: String,
    age: Number,
    phone: String,
    photo: String,
  },
  cart: {type: String},
});

const User = model("User", userSchema);

export default User;