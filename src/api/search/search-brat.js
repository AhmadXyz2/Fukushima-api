const axios = require('axios');

module.exports = function(app) {
  app.get('/search/brat', async (req, res) => {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ status: false, error: 'Query is required' });
    }
    try {
      const encodedText = encodeURIComponent(q);
      const response = await axios.get(`https://brat.caliphdev.com/api/brat?text=${encodedText}`, { responseType: 'arraybuffer' });
      res.setHeader('Content-Type', 'image/png');
      res.status(200).send(response.data);
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
