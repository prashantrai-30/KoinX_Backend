const CryptoPrice = require('../models/CryptoPrice')

const deviation = async (req,res) => {
    const {coin} = req.query;
    try {
        if (!coin) {
            return res.status(400).json({ error: 'Coin parameter is required' });
        }

        const prices = await CryptoPrice.find(
            { coinId: coin },
            { priceUSD: 1},
            { sort: { timestamp: -1 }, limit: 100 }
        );

        if (prices.length === 0) {
            return res.status(404).json({ error:"No data found for the specified coin"})
        }

        const  priceValues = prices.map(p => p.priceUSD);
        const mean = priceValues.reduce((a,b) => a + b) / priceValues.length;
        const squaredDiffs = priceValues.map(price => Math.pow(price - mean, 2));
        const variance = squaredDiffs.reduce((a,b) => a + b) / priceValues.length;
        const deviation = Math.sqrt(variance);

        res.json({ deviation: Number(deviation.toFixed(2))});
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {deviation}