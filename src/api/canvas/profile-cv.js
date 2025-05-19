const axios = require('axios');

module.exports = function(app) {
  app.get('/canvas/profile', async (req, res) => {
    const {
      backgroundURL,
      avatarURL,
      fromLevel,
      toLevel,
      name
    } = req.query;

    if (!backgroundURL || !avatarURL || !name || !fromLevel || !toLevel) {
      return res.status(400).json({
        status: false,
        error: 'Parameter tidak lengkap: backgroundURL, avatarURL, name, fromLevel, dan toLevel wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://api.siputzx.my.id/api/canvas/level-up', {
        params: {
          backgroundURL,
          avatarURL,
          fromLevel,
          toLevel,
          name
        },
        responseType: 'arraybuffer'
      });

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': response.data.length
      });
      res.end(response.data);
    } catch (error) {
      console.error('Gagal generate canvas:', error.message);
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat mengambil gambar dari API.'
      });
    }
  });
};
