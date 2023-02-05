import mongoose from "mongoose";

export const CARRITOS_SCHEMA = new mongoose.Schema({
    productos: { type: Array },
    timestamp: {type: Date}
});