class MovingAverageStrategy {
  private shortTermPrices: number[];
  private longTermPrices: number[];

  constructor() {
    this.shortTermPrices = [];
    this.longTermPrices = [];
  }

  // Add new price to the price history
  public addPrice(price: number) {
    this.shortTermPrices.push(price);
    this.longTermPrices.push(price);

    // Limit the history length
    if (this.shortTermPrices.length > 5) this.shortTermPrices.shift();  // Short term (5 periods)
    if (this.longTermPrices.length > 20) this.longTermPrices.shift();   // Long term (20 periods)
  }

  // Calculate moving average
  private calculateAverage(prices: number[]): number {
    const sum = prices.reduce((acc, price) => acc + price, 0);
    return sum / prices.length;
  }

  // Decide if it's time to buy or sell
  public shouldBuyOrSell(): 'buy' | 'sell' | 'hold' {
    if (this.shortTermPrices.length < 5 || this.longTermPrices.length < 20) {
      return 'hold';  // Not enough data
    }

    const shortTermAverage = this.calculateAverage(this.shortTermPrices);
    const longTermAverage = this.calculateAverage(this.longTermPrices);

    if (shortTermAverage > longTermAverage) {
      return 'buy';  // Buy when short-term average crosses above long-term
    } else if (shortTermAverage < longTermAverage) {
      return 'sell';  // Sell when short-term average crosses below long-term
    }
    
    return 'hold';  // No clear signal
  }
}

export default MovingAverageStrategy;
