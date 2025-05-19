module.exports = function (app) {
  app.get('/tts/open-tts', async (req, res) => {
    const { text, model } = req.query;

    if (!text || !model) {
      return res.status(400).json({
        status: false,
        message: 'Parameter "text" dan "model" wajib diisi'
      });
    }

    try {
      const encodedText = encodeURIComponent(text);
      const audioURL = `https://fastrestapis.fasturl.cloud/tts/openai?text=${encodedText}&model=${model}`;

      return res.json({
        status: true,
        audio: audioURL,
        message: 'Klik link audio untuk mendengarkan'
      });
    } catch (error) {
      console.error('TTS error:', error.message);
      return res.status(500).json({
        status: false,
        message: 'Gagal membuat audio'
      });
    }
  });
};