import axios from "axios";
import { Crypto } from "../models/crypto.model.js";
import dotenv from "dotenv";

dotenv.config();

export const fetchCryptoData = async () => {
  const api_key = process.env.COIN_GECKO_API_KEY;

  // api url with coins -> [bitcoin,ethereum,matic-network] and vs_currency -> usd and include_market_cap=true and include_24hr_change=true
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true";

  try {
    // fetching data from api
    const response = await axios.get(url, {
      headers: {
        "x-cg-demo-api-key": api_key,
      },
    });

    const data = response.data;

    const cryptoData = [
      { coin: "Bitcoin", id: "bitcoin", data: data.bitcoin },
      { coin: "Ethereum", id: "ethereum", data: data.ethereum },
      {
        coin: "Matic-Network",
        id: "matic-network",
        data: data["matic-network"],
      },
    ];

    // Insert new data for each cryptocurrency every 2 hrs

    for (const crypto of cryptoData) {
      await Crypto.create({
        coin: crypto.coin.toLowerCase(),

        priceUSD: crypto.data.usd,
        marketCapUSD: crypto.data.usd_market_cap,
        percentChange24h: crypto.data.usd_24h_change,
        lastUpdated: new Date(), // store the timestamp of the last update
      });
    }

    console.log("Crypto data fetched and stored successfully");
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
};
