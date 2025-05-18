const axios = require('axios');

module.exports = function(app) {
  app.get('/download/ytmp4', async (req, res) => {
    try {
      const { url } = req.query;

      // Validasi parameter URL
      if (!url) {
        return res.status(400).json({ 
          status: false, 
          error: 'Parameter "url" tidak ditemukan',
          usage: 'Gunakan /download/ytmp4?url=URL_VIDEO_YOUTUBE'
        });
      }

      // Validasi format URL YouTube
      if (!url.match(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/)) {
        return res.status(400).json({ 
          status: false, 
          error: 'URL tidak valid. Harap masukkan URL YouTube yang valid' 
        });
      }

      // Mengambil data dari API eksternal
      const apiUrl = `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(url)}`;
      const response = await axios.get(apiUrl, {
        timeout: 10000, // Timeout 10 detik
        headers: {
          'User-Agent': 'Mozilla/5.0 (Finix-UI YouTube Downloader)'
        }
      });

      const { data } = response;

      // Validasi respons API
      if (!data || !data.status || !data.data) {
        return res.status(502).json({ 
          status: false, 
          error: 'Respons tidak valid dari API eksternal' 
        });
      }

      // Format respons sukses
      res.json({
        status: true,
        creator: 'Fukushima-UI',
        result: {
          title: data.data.title || 'Tidak diketahui',
          duration: data.data.duration || null,
          thumbnail: data.data.thumb || null,
          download_url: data.data.dl,
          quality: data.data.q || null
        }
      });

    } catch (error) {
      console.error('Error downloading YouTube video:', error);
      
      // Penanganan error yang lebih spesifik
      if (error.response) {
        // Error dari API eksternal
        res.status(502).json({ 
          status: false, 
          error: 'API eksternal merespons dengan error',
          details: error.response.data 
        });
      } else if (error.request) {
        // Tidak mendapat respons dari API eksternal
        res.status(504).json({ 
          status: false, 
          error: 'Tidak dapat terhubung ke API eksternal',
          details: error.message 
        });
      } else {
        // Error lainnya
        res.status(500).json({ 
          status: false, 
          error: 'Terjadi kesalahan internal server',
          details: error.message 
        });
      }
    }
  });
};
