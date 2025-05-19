const axios = require('axios');

module.exports = function(app) {
  app.get('/canvas/profile2', async (req, res) => {
    const {
      backgroundURL,
      avatarURL,
      rankName,
      rankId,
      requireExp,
      level,
      name,
      exp
    } = req.query;

    if (!backgroundURL || !avatarURL || !name || !rankName || !rankId || !requireExp || !level || !exp) {
      return res.status(400).json({
        status: false,
        error: 'Parameter tidak lengkap: backgroundURL, avatarURL, name, rankName, rankId, requireExp, level, dan exp wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://api.siputzx.my.id/api/canvas/profile', {
        params: {
          backgroundURL,
          avatarURL,
          rankName,
          rankId,
          requireExp,
          level,
          name,
          exp
        },
        responseType: 'arraybuffer'
      });

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': response.data.length
      });
      res.end(response.data);
    } catch (error) {
      console.error('Gagal generate profile canvas:', error.message);
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat mengambil gambar dari API.'
      });
    }
  });
};
