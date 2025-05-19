const axios = require('axios');

module.exports = function(app) {
  app.get('/canvas/welcome-cv', async (req, res) => {
    const {
      avatar,
      background,
      title,
      description,
      borderColor,
      avatarBorderColor,
      overlayOpacity
    } = req.query;

    if (!avatar || !background || !title || !description || !borderColor || !avatarBorderColor || !overlayOpacity) {
      return res.status(400).json({
        status: false,
        error: 'Parameter tidak lengkap. Semua parameter wajib diisi: avatar, background, title, description, borderColor, avatarBorderColor, overlayOpacity.'
      });
    }

    try {
      const response = await axios.get('https://fastrestapis.fasturl.cloud/canvas/welcome', {
        params: {
          avatar,
          background,
          title,
          description,
          borderColor,
          avatarBorderColor,
          overlayOpacity
        },
        responseType: 'arraybuffer'
      });

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': response.data.length
      });
      res.end(response.data);
    } catch (error) {
      console.error('Gagal mengambil welcome image:', error.message);
      res.status(500).json({
        status: false,
        creator: 'Fukushima',
        error: 'Terjadi kesalahan saat mengambil gambar dari API.'
      });
    }
  });
};