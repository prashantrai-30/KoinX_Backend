const CryptoPrice = require('../models/CryptoPrice');

const stats = async (req,res) => {
    const {coin} = req.query;
    try {
        if(!coin) {
            return res.status(400).json({ error: "Coin Parameter is required"});
        }

        const latestData = await CryptoPrice.findOne(
            {coinId: coin},
            {priceUSD: 1,marketCapUSD: 1, change24h: 1},
            { sort: {timestamp: -1}}
        );
        if (!latestData) {
            return res.status(404).json({ error: "No data found for the specified coin"});
        }

        res.json({
            price: latestData.priceUSD,
            marketCap: latestData.marketCapUSD,
            "24Change": latestData.change24h
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error"})
    }
}

module.exports = {stats};