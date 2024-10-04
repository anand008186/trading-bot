// src/metrics.ts
import fs from 'fs';

const trades: { action: string, price: number, timestamp: string }[] = [];

export const logTrade = (action: 'BUY' | 'SELL', price: number) => {
    const trade = { action, price, timestamp: new Date().toISOString() };
    trades.push(trade);

    // Optionally save to a file
    fs.writeFileSync('trades.json', JSON.stringify(trades, null, 2));
};

export const calculateProfit = (): number => {
    // Sum up the profit/loss from trades
    let profit = 0;
    for (let i = 0; i < trades.length; i += 2) {
        if (trades[i].action === 'BUY' && trades[i + 1]?.action === 'SELL') {
            profit += trades[i + 1].price - trades[i].price;
        }
    }
    return profit;
};
