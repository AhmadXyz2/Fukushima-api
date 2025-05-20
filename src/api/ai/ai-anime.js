const axios = require('axios');

module.exports = function (app) {
  app.get('/ai/anime-ai', async (req, res) => {
    const { imageUrl } = req.query;
    if (!imageUrl) {
      return res.status(400).json({
        status: false,
        error: 'Parameter imageUrl wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://fastrestapis.fasturl.cloud/aiimage/toanime', {
        params: {
          imageUrl,
          gender: 'male',
          specificPrompt: 'Elegant and majestic'
        },
        responseType: 'arraybuffer'
      });

      res.setHeader('Content-Type', 'image/png');
      res.send(response.data);
    } catch {
      res.status(500).json({
        status: false,
        error: 'Gagal mengubah gambar ke gaya anime.'
      });
    }
  });
};