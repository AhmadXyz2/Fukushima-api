const axios = require('axios');

module.exports = function(app) {
  app.get('/tts/open-tts', async (req, res) => {
    const { text, model } = req.query;

    if (!text || !model) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "text" dan "model" wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://fastrestapis.fasturl.cloud/tts/openai', {
        params: { text, model },
        responseType: 'arraybuffer'
      });

      res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': response.data.length
      });
      res.end(response.data);
    } catch (error) {
      console.error('Gagal mengambil audio:', error.message);
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat menghubungi API TTS.'
      });
    }
  });
};
