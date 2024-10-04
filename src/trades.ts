interface Trade {
    type: 'buy' | 'sell';
    price: number;
    profit?: number;
  }
  
  class Trades {
    private tradeHistory: Trade[];
  
    constructor() {
      this.tradeHistory = [];
    }
  
    // Record a buy/sell trade
    public recordTrade(type: 'buy' | 'sell', price: number, profit?: number) {
      const trade: Trade = { type, price, profit };
      this.tradeHistory.push(trade);
      console.log(`Recorded trade: ${type} at ${price}, profit: ${profit ?? 'N/A'}`);
    }
  
    // Get a summary of all trades
    public getTradeHistory(): Trade[] {
      return this.tradeHistory;
    }
  
    // Calculate total profit/loss
    public calculateTotalProfit(): number {
      return this.tradeHistory.reduce((acc, trade) => acc + (trade.profit || 0), 0);
    }
  }
  
  export default Trades;
  