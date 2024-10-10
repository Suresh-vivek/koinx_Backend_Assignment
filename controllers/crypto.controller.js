import { Crypto } from "../models/crypto.model.js";

export const getCryptoStats = async (req, res) => {
  const { coin } = req.query;

  // check if coin is provided
  if (!coin) {
    return res.status(400).json({
      success: false,
      message: "Please provide coin",
    });
  }

  try {
    // Find the most recent entry based on the lastUpdated field
    const cryptoData = await Crypto.findOne({
      coin: coin.toLowerCase(),
    }).sort({ lastUpdated: -1 }); // case insensitive search

    // check if coin is in database
    if (!cryptoData) {
      return res.status(400).json({
        success: false,
        message: "No such coin found in database",
      });
    }

    // response

    return res.status(200).json({
      price: cryptoData.priceUSD,
      marketCap: cryptoData.marketCapUSD,
      "24hchange": cryptoData.percentChange24h,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStandardDeviation = async (req, res) => {
  const { coin } = req.query;

  // check if coin is provided
  if (!coin) {
    return res.status(400).json({
      success: false,
      message: "Please provide coin",
    });
  }

  try {
    // fetch the last 100 records for the given coin

    const cryptoRecords = await Crypto.find({
      coin: coin.toLowerCase(),
    })
      .sort({ lastUpdated: -1 })
      .limit(100);

    // check if coins is in database or not

    if (cryptoRecords.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No such coin found in database",
      });
    }

    // extract the prices from the records

    const prices = cryptoRecords.map((record) => record.priceUSD);

    // calculate the Mean (average) of the prices

    const meanPrice =
      prices.reduce((acc, price) => acc + price, 0) / prices.length;

    // calculate the variance

    const variance =
      prices.reduce((acc, price) => acc + Math.pow(price - meanPrice, 2), 0) /
      prices.length;

    // calculate standard deviation
    const standardDeviation = Math.sqrt(variance);

    // return response
    return res.status(200).json({
      deviation: standardDeviation.toFixed(2),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
