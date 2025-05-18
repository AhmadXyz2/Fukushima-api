const axios = require('axios');

module.exports = function(app) {
  app.get('/tools/web-screenshot', async (req, res) => {
    const { url, type } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "url" diperlukan'
      });
    }

    try {
      const response = await axios.get('https://api.vreden.my.id/api/ssweb', {
        params: {
          url,
          type: type || 'desktop'
        },
        responseType: 'arraybuffer' // supaya dapat buffer gambar
      });

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': response.data.length
      });
      res.end(response.data);
    } catch (error) {
      console.error('Gagal ambil screenshot:', error.message);
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat mengambil screenshot'
      });
    }
  });
};