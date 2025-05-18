const axios = require('axios');

module.exports = function(app) {
  app.get('/download/ytmp3', async (req, res) => {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ status: false, error: 'Parameter "url" tidak ditemukan' });
    }

    try {
      const { data } = await axios.get(`https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(url)}`);

      if (!data.status) {
        return res.status(500).json({ status: false, error: 'Gagal mengambil data dari API' });
      }

      res.json({
        status: true,
        creator: 'Fukushima',
        result: {
          title: data.data.title,
          download_url: data.data.dl
        }
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
