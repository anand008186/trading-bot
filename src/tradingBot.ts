import axios from 'axios';
import Trades from './trades';
import MovingAverageStrategy from './strategy';
import logger from './logger';

interface StockData {
  price: number;
  changePercentage: number;
}

class TradingBot {
  private currentPosition: number | null;  // Track whether a stock is held
  private balance: number;                 // Starting balance
  private trades: Trades;
  private strategy: MovingAverageStrategy;

  constructor() {
    this.currentPosition = null;
    this.balance = 10000;                 // Starting balance
    this.trades = new Trades();
    this.strategy = new MovingAverageStrategy();
  }

  // Start the trading bot, periodically fetch stock data and execute trades
  public start() {
    logger.info("Starting trading bot...");
    setInterval(async () => {
      try {
        const stockData: StockData = await this.fetchStockData();
        this.strategy.addPrice(stockData.price);  // Add price to strategy
        this.handleTrading(stockData);
      } catch (error) {
        logger.error("Error fetching stock data:", error);
      }
    }, 2500);  // Poll every 2.5 seconds
  }

  // Fetch stock data from the mock API
  private async fetchStockData(): Promise<StockData> {
    try {
      const response = await axios.get<StockData>('http://localhost:3000/api/stock-data');
      return response.data;
    } catch (error) {
      logger.error(`Failed to fetch stock data: ${(error as Error).message}`);
      throw new Error("Could not retrieve stock data.");
    }
  }

  // Handle the buy/sell decision based on the strategy
  private handleTrading(stockData: StockData) {
    const action = this.strategy.shouldBuyOrSell();

    if (action === 'buy' && !this.currentPosition) {
      this.buyStock(stockData.price);
    } else if (action === 'sell' && this.currentPosition) {
      this.sellStock(stockData.price);
    }
  }

  // Buy stock
  private buyStock(price: number) {
    logger.info(`Buying stock at price: ${price}`);
    this.currentPosition = price;
    this.trades.recordTrade('buy', price);
  }

  // Sell stock and calculate profit
  private sellStock(price: number) {
    if (this.currentPosition) {
      const profit = price - this.currentPosition;
      logger.info(`Selling stock at price: ${price}, profit: ${profit}`);
      this.trades.recordTrade('sell', price, profit);
      this.currentPosition = null;  // Reset position after selling
    }
  }
}

export default TradingBot;
