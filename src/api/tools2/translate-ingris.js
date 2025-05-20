const axios = require('axios');

module.exports = function (app) {
  app.get('/tools2/translateingris', async (req, res) => {
    const { text } = req.query;

    if (!text) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "text" wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://fastrestapis.fasturl.cloud/tool/translate', {
        params: { text, target: 'id' }
      });

      const result = response.data?.result;
      if (!result?.translatedText) {
        return res.status(500).json({
          status: false,
          error: 'Gagal menerjemahkan teks.'
        });
      }

      res.json({
        status: true,
        creator: 'Fukushima',
        originalText: text,
        translatedText: result.translatedText,
        from: result.from,
        to: result.to
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat memproses permintaan.'
      });
    }
  });
};