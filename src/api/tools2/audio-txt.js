const axios = require('axios');

module.exports = function (app) {
  app.get('/tools2/audio2txt', async (req, res) => {
    const { audioUrl } = req.query;

    if (!audioUrl) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "audioUrl" wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://fastrestapis.fasturl.cloud/aiexperience/voicetotext', {
        params: { audioUrl }
      });

      const result = response.data?.result;

      if (!result) {
        return res.status(500).json({
          status: false,
          error: 'Gagal mengubah audio menjadi teks.'
        });
      }

      res.json({
        status: true,
        creator: 'Fukushima',
        transcribed: result
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat memproses permintaan.'
      });
    }
  });
};