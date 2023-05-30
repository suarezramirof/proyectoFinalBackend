import mongoose from "mongoose";

const CARTS_SCHEMA = new mongoose.Schema(
  {
    userId: { type: String },
    productos: { type: Array },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CARTS_SCHEMA);
