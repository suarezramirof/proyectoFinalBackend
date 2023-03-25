import {Schema, model} from "mongoose";

const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    address: String,
    age: Number,
    phone: String,
    photo: String
})

const User = model("User", userSchema);

export default User;