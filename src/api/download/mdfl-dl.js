const axios = require('axios');

module.exports = function(app) {
  app.get('/download/mediafire', async (req, res) => {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "url" tidak ditemukan'
      });
    }

    try {
      const { data } = await axios.get(`https://api.vreden.my.id/api/mediafiredl?url=${encodeURIComponent(url)}`);

      if (!data.result || !Array.isArray(data.result) || data.result.length === 0 || !data.result[0].status) {
        return res.status(500).json({
          status: false,
          error: 'Gagal mengambil data dari API MediaFire'
        });
      }

      const file = data.result[0];
      res.json({
        status: true,
        creator: 'Fukushima',
        result: {
          filename: file.nama,
          mimetype: file.mime,
          size: file.size,
          download_url: file.link,
          server: file.server
        }
      });

    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message
      });
    }
  });
};
