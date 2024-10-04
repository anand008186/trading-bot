import express, { Request, Response } from 'express';
import TradingBot from './tradingBot';
import { getStockPrice } from './stockData';
import logger from './logger';

const app = express();
const port = 3000;

// Initialize the trading bot
const tradingBot = new TradingBot();

// Mock endpoint to simulate stock data fetching
app.get('/api/stock-data', (req: Request, res: Response) => {
  const stockPrice = getStockPrice();
  res.json(stockPrice);
});

// Start the trading bot to monitor stock prices and make trades
tradingBot.start();

// Start server
app.listen(port, () => {
  logger.info(`Trading bot server running on port ${port}`);
});
