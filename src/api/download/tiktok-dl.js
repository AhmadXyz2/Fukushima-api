const axios = require('axios');

module.exports = function(app) {
  app.get('/download/tiktok', async (req, res) => {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "url" tidak ditemukan'
      });
    }

    try {
      const response = await axios.get(`https://api.siputzx.my.id/api/tiktok/v2?url=${encodeURIComponent(url)}`);
      const data = response.data;

      if (!data.success) {
        return res.status(500).json({ status: false, error: 'Gagal mengambil data dari API TikTok' });
      }

      const videoLinks = data.data.download.video.map(v => v.url);

      res.status(200).json({
        status: true,
        creator: 'Fukushima',
        result: {
          description: data.data.metadata.description || '',
          audio: data.data.download.audio,
          video: videoLinks
        }
      });

    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message || 'Terjadi kesalahan server'
      });
    }
  });
};
