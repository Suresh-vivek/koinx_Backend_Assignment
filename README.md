# Cryptocurrency Data Fetcher API

This Node.js application fetches the current price, market cap, and 24-hour price change of three cryptocurrencies—Bitcoin, Matic, and Ethereum—using the CoinGecko API. It stores the data in MongoDB every two hours and provides APIs to retrieve the latest data and calculate the standard deviation of prices over time.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [Features](#features)
  - [Task 1: Background Job](#task-1-background-job)
  - [Task 2: Latest Data API](#task-2-latest-data-api)
  - [Task 3: Price Deviation API](#task-3-price-deviation-api)
- [Environment Variables](#environment-variables)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Axios
- CoinGecko API
- Mongoose
- Cron

## Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Suresh-vivek/koinx_Backend_Assignment
   cd KoinxAssignment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm run start
   ```

## Features

### Task 1: Background Job

1. Every two hours, fetch the latest data from CoinGecko API and store it in MongoDB.

The job retrieves the following details:

- Price in USD
- Market Cap in USD
- 24-hour price change in percentage

### Task 2: Latest Data API

1. Returns the latest price, market cap, and 24-hour price change of three cryptocurrencies—Bitcoin, Matic Network, and Ethereum using the CoinGecko API.

The API endpoint is `/api/v1/crypto/stats` and the response is a JSON object with the following properties:

- Query parameters:

```json
{
  "coin": `bitcoin` // Could be one of the above 3 coins
}
```

- Sample Response :

```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

### Task 3: Price Deviation API

1. Return the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.

The API endpoint is `/api/v1/crypto/deviation` and the response is a JSON object with the following properties:

- Query parameters:

```json
{
  "coin": `bitcoin` // Could be one of the above 3 coins
}
```

- Sample Response:

```json
{
  "deviation": 4082.48
}
```

## Environment Variables

- `COIN_GECKO_API_KEY`: Your CoinGecko API key.
- `MONGO_URI`: Your MongoDB connection string.
- `PORT`: Your port number.
