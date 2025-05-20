const axios = require('axios');

module.exports = function (app) {
  app.get('/search/sendmail', async (req, res) => {
    const { to, from, subject, message } = req.query;

    if (!to || !from || !subject || !message) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "to", "from", "subject", dan "message" wajib diisi.'
      });
    }

    try {
      const response = await axios.get('https://fastrestapis.fasturl.cloud/tool/sendmail', {
        params: { to, from, subject, message }
      });

      const result = response.data?.result;
      if (!result?.success) {
        return res.status(500).json({
          status: false,
          error: 'Gagal mengirim email.'
        });
      }

      res.json({
        status: true,
        creator: 'Fukushima',
        info: 'Email berhasil dikirim.',
        data: {
          to: result.to,
          from: result.from,
          subject: result.subject,
          messagePreview: result.messagePreview,
          timestamp: result.timestamp
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