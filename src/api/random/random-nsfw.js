const axios = require('axios');
module.exports = function(app) {
    async function nsfw() {
        try {
            const { data } = await axios.get(`https://api.waifu.pics/nsfw/neko`)
            const response = await axios.get(data[Math.floor(data.length * Math.random())], { responseType: 'arraybuffer' });
            return Buffer.from(response.data);
        } catch (error) {
            throw error;
        }
    }
    app.get('/random/nsfw', async (req, res) => {
        try {
            const pedo = await nsfw();
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': pedo.length,
            });
            res.end(pedo);
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    });
};
