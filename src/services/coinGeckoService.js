const axios = require('axios');
const logger = require('../config/logger')

class CoinGeckoService {
    constructor() {
        this.baseURL = process.env.COINGECKO_API_URL;
    }

    async getCoinData(coinId) {
        try {
            const response = await axios.get(
                `${this.baseURL}/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
            );

            const data = response.data[coinId];
            return {
                priceUSD: data.usd,
                marketCapUSD: data.usd_market_cap,
                change24h: data.usd_24h_change
            };
        } catch (error) {
            logger.error(`Error fetching data for ${coinId}:`, error);
            throw error;
        }
    }
}

module.exports = new CoinGeckoService();