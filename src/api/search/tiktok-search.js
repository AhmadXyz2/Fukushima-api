const axios = require('axios');

module.exports = function(app) {
  app.get('/search/tiktok', async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ status: false, error: 'Parameter "query" wajib diisi.' });

    try {
      const response = await axios.get('https://api.vreden.my.id/api/search/tiktok', { params: { query } });
      const videos = response.data.result?.videos;

      if (!videos || videos.length === 0) {
        return res.status(404).json({ status: false, error: 'Video tidak ditemukan.' });
      }

      const randomVideo = videos[Math.floor(Math.random() * videos.length)];

      res.json({
        status: true,
        creator: 'Fukushima',
        query,
        video: randomVideo
      });
    } catch (err) {
      res.status(500).json({ status: false, error: 'Gagal mengambil data dari API TikTok.' });
    }
  });
};
