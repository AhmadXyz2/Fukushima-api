const axios = require('axios');

module.exports = function (app) {
  app.get('/tools/ceklokasi', async (req, res) => {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "name" (nama kota) wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/city', {
        params: { name },
        headers: {
          'X-Api-Key': 'xQWgI6YfWXdXQtTjM3YB+A==TUUb6WiaDH3qTSM3'
        }
      });

      const result = response.data;

      if (!result || result.length === 0) {
        return res.status(404).json({
          status: false,
          error: 'Kota tidak ditemukan.'
        });
      }

      const data = result[0];
      res.json({
        status: true,
        creator: 'Fukushima',
        data: {
          nama: data.name,
          negara: data.country,
          region: data.region,
          ibu_kota: data.is_capital,
          populasi: data.population,
          koordinat: {
            latitude: data.latitude,
            longitude: data.longitude
          }
        }
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat memproses permintaan.'
      });
    }
  });
};