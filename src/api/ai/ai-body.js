const axios = require('axios');

module.exports = function (app) {
  app.get('/ai/aireal-img', async (req, res) => {
    const { prompt } = req.query;
    if (!prompt) return res.status(400).json({ status: false, error: 'Prompt wajib diisi.' });

    try {
      const url = 'https://fastrestapis.fasturl.cloud/aiimage/bodygenerator';
      const params = {
        prompt,
        type: 'Realistic',
        visualStyle: 'Covering breasts, Concept Pool Ladder',
        characterStyle: 'Realistic Doll V4',
      };

      const imageRes = await axios.get(url, {
        params,
        responseType: 'arraybuffer'
      });

      res.setHeader('Content-Type', 'image/png');
      res.send(imageRes.data);
    } catch {
      res.status(500).json({ status: false, error: 'Gagal mengambil gambar dari API.' });
    }
  });
};