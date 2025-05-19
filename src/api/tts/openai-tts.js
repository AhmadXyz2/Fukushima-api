module.exports = function(app) {
  app.get('/tts/open-tts', async (req, res) => {
    const { text, model } = req.query;

    if (!text || !model) {
      return res.status(400).json({
        status: false,
        message: 'Parameter "text" dan "model" wajib diisi'
      });
    }

    const audioUrl = `https://fastrestapis.fasturl.cloud/tts/openai?text=${encodeURIComponent(text)}&model=${encodeURIComponent(model)}`;

    res.json({
      status: true,
      creator: 'Fukushima',
      audio: audioUrl,
      message: 'Klik link audio untuk mendengarkan'
    });
  });
};