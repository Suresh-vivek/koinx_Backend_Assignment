import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";

import { connectDB } from "./db/connectDB.js";
import { fetchCryptoData } from "./services/fetchCryptoData.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// routes
app.use("/api/v1/crypto", cryptoRoutes);

// schedule  job  to fetch crypto data every 2 hrs
cron.schedule("0 */2 * * *", () => {
  console.log("fetching crypto data every 2 hrs");
  fetchCryptoData();
});

app.listen(PORT, () => {
  connectDB();

  console.log("Server is running on port ", PORT);
});
