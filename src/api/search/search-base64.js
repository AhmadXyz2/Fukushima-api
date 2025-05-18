module.exports = function(app) {
  function toBase64(text) {
    return Buffer.from(text).toString('base64');
  }

  app.get('/search/base64', (req, res) => {
    const { text } = req.query;

    if (!text) {
      return res.status(400).json({ status: false, error: 'Parameter "text" tidak ditemukan' });
    }

    try {
      const base64Text = toBase64(text);
      res.json({
        status: true,
        creator: 'Fukushima',
        result: base64Text
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};