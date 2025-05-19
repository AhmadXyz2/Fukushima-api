const axios = require('axios');

module.exports = function (app) {
  app.get('/download/fb', async (req, res) => {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "url" wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://api.vreden.my.id/api/fbdl', {
        params: { url }
      });

      const result = response.data;
      if (!result?.data?.hd_url && !result?.data?.sd_url) {
        return res.status(404).json({
          status: false,
          error: 'Video tidak ditemukan atau tidak tersedia.'
        });
      }

      res.json({
        status: true,
        creator: 'Fukushima',
        title: result.data.title || '-',
        hd_url: result.data.hd_url || null,
        sd_url: result.data.sd_url || null
      });
    } catch (error) {
      console.error('Gagal mengambil data Facebook:', error.message);
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat mengambil data dari API Facebook.'
      });
    }
  });
};