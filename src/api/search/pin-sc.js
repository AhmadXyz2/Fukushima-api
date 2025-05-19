const axios = require('axios');

module.exports = function (app) {
  app.get('/search/pin', async (req, res) => {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "query" wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://api.vreden.my.id/api/pinterest', {
        params: { query }
      });

      const result = response.data;
      if (!result?.result || result.result.length === 0) {
        return res.status(404).json({
          status: false,
          error: 'Gambar tidak ditemukan.'
        });
      }

      const randomImage = result.result[Math.floor(Math.random() * result.result.length)];

      res.json({
        status: true,
        creator: 'Fukushima',
        query,
        image: randomImage
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat mengambil data dari API Pinterest.'
      });
    }
  });
};