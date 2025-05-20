const axios = require('axios');

module.exports = function (app) {
  app.get('/tools2/encodejs', async (req, res) => {
    const { inputCode } = req.query;

    if (!inputCode) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "inputCode" wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://fastrestapis.fasturl.cloud/tool/jsobfuscate', {
        params: {
          inputCode,
          encOptions: 'NORMAL',
          specialCharacters: 'on',
          fastDecode: 'off'
        }
      });

      const result = response.data?.result;
      if (!result) {
        return res.status(500).json({
          status: false,
          error: 'Gagal mengenkripsi kode JavaScript.'
        });
      }

      res.json({
        status: true,
        creator: 'Fukushima',
        originalCode: inputCode,
        obfuscatedCode: result
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        error: 'Terjadi kesalahan saat memproses permintaan.'
      });
    }
  });
};