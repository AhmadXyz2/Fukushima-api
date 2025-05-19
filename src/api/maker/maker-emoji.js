const axios = require('axios');

module.exports = function (app) {
  app.get('/maker/emojimix', async (req, res) => {
    const { emoji1, emoji2 } = req.query;

    if (!emoji1 || !emoji2) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "emoji1" dan "emoji2" wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://fastrestapis.fasturl.cloud/maker/emojimix', {
        params: { emoji1, emoji2 },
        responseType: 'arraybuffer'
      });

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': response.data.length
      });
      res.end(response.data);
    } catch (error) {
      console.error('Gagal mengambil emojimix:', error.message);
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat mengambil gambar dari API emojimix.'
      });
    }
  });
};