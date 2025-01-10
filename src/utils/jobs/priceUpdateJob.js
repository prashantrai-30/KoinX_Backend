const cron = require('node-cron');
const CryptoPrice = require('../../models/CryptoPrice')
const CoinGeckoService = require('../../services/coinGeckoService')
const logger = require('../../config/logger')

const SUPPORTED_COINS = ['bitcoin', 'matic-network', 'ethereum'];

const updatePrices = async () => {
    try {
      for (const coinId of SUPPORTED_COINS) {
        const coinData = await coinGeckoService.getCoinData(coinId);
        
        await CryptoPrice.create({
          coinId,
          priceUSD: coinData.priceUSD,
          marketCapUSD: coinData.marketCapUSD,
          change24h: coinData.change24h
        });
        
        logger.info(`Updated price data for ${coinId}`);
      }
    } catch (error) {
      logger.error('Error in price update job:', error);
    }
  };
  
  const startJob = () => {
    cron.schedule('0 */2 * * *', updatePrices);
    logger.info('Price update job scheduled');
    updatePrices();
  };
  
  module.exports = { startJob };