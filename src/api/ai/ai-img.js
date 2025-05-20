const axios = require('axios');

module.exports = function (app) {
  app.get('/ai/ai-img.js', async (req, res) => {
    const { prompt, size } = req.query;

    if (!prompt) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "prompt" wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://fastrestapis.fasturl.cloud/aiimage/flux/schnell', {
        params: {
          prompt,
          size: size || '1_1_HD'
        }
      });

      if (!response.data?.result) {
        return res.status(500).json({
          status: false,
          error: 'Gagal menghasilkan gambar.'
        });
      }

      res.json({
        status: true,
        creator: 'Fukushima',
        prompt,
        image: response.data.result
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat memproses permintaan.'
      });
    }
  });
};