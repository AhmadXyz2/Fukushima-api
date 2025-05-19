const axios = require('axios');

module.exports = function(app) {
  app.get('/canvas/welcome-cv', async (req, res) => {
    const { avatar, background, name } = req.query;

    if (!avatar || !background || !name) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "avatar", "background", dan "name" wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://fastrestapis.fasturl.cloud/canvas/welcome', {
        params: {
          avatar,
          background,
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
      console.error('Gagal generate welcome canvas:', error.message);
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat mengambil gambar dari API.'
      });
    }
  });
};
