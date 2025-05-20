const axios = require('axios');

module.exports = function (app) {
  app.get('/download/capcut', async (req, res) => {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({
        status: false,
        error: 'Parameter url wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://api.vreden.my.id/api/capcutdl', {
        params: { url }
      });

      const result = response.data?.result;
      if (!result?.status || !result?.url) {
        return res.status(500).json({
          status: false,
          error: 'Gagal mendapatkan data dari API.'
        });
      }

      res.json({
        status: true,
        creator: 'fukushima',
        title: result.title?.trim() || 'Tanpa Judul',
        download: result.url
      });
    } catch (e) {
      res.status(500).json({
        status: false,
        error: e.message
      });
    }
  });
};