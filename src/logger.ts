import { createLogger, transports, format } from 'winston';
import colors from 'colors';  // Use colors library instead of chalk

const customFormat = format.printf(({ level, message, timestamp }) => {
  let formattedMessage = message;

  // Color the log message based on the log type
  if (message.includes('Buying stock')) {
    formattedMessage = colors.green(message);  // Green for "buy" messages
  } else if (message.includes('Selling stock')) {
    formattedMessage = colors.red(message);    // Red for "sell" messages
  }

  return `${timestamp} [${level}]: ${formattedMessage}`;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    customFormat  // Apply the custom format with colors
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'trading_bot.log' })
  ]
});

export default logger;
