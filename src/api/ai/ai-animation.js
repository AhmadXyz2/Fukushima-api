const axios = require('axios');

module.exports = function (app) {
  app.get('/ai/toanimation', async (req, res) => {
    const { imageUrl, style } = req.query;
    if (!imageUrl || !style) {
      return res.status(400).json({
        status: false,
        error: 'Parameter imageUrl dan style wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://fastrestapis.fasturl.cloud/imgedit/toanimation', {
        params: { imageUrl, style },
        responseType: 'arraybuffer'
      });

      res.setHeader('Content-Type', 'image/png');
      res.send(response.data);
    } catch (error) {
      res.status(500).json({
        status: false,
        error: 'Gagal mengambil gambar dari API.'
      });
    }
  });
};