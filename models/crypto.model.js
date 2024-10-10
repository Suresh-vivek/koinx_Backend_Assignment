import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema(
  {
    coin: {
      type: String,
      required: true,
    },
    priceUSD: {
      type: Number,
      required: true,
    },
    marketCapUSD: {
      type: Number,
      required: true,
    },
    percentChange24h:{
      type: Number,
      required: true,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Crypto = mongoose.model("Crypto", cryptoSchema);
