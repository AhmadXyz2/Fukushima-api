const axios = require('axios');

module.exports = function (app) {
  app.get('/tools/wastalk', async (req, res) => {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "url" wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://fastrestapis.fasturl.cloud/stalk/wachannel', {
        params: { url }
      });

      const data = response.data.result;

      res.json({
        status: true,
        creator: 'Fukushima',
        result: {
          name: data.name,
          followers: data.followers,
          description: data.description,
          channelLink: data.channelLink,
          image: data.image
        }
      });
    } catch (error) {
      console.error('Gagal mengambil data WA Channel:', error.message);
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat mengambil data dari API WA Channel.'
      });
    }
  });
};