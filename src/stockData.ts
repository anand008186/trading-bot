interface StockPrice {
  price: number;
  changePercentage: number;
}

let lastPrice = 100;  // Initial stock price

export function getStockPrice(): StockPrice {
  const change = (Math.random() - 0.5) * 2;  // Random fluctuation (-1% to +1%)
  const newPrice = Math.max(lastPrice + change, 1);  // Ensure positive price
  const changePercentage = ((newPrice - lastPrice) / lastPrice) * 100;

  lastPrice = newPrice;  // Update last price
  return {
    price: newPrice,
    changePercentage: parseFloat(changePercentage.toFixed(2)),
  };
}
