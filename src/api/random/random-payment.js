const axios = require('axios');

async function createPayment(amount, codeqr) {
  const apiUrl = "https://linecloud.my.id/api/orkut/createpayment";
  const apikey = "Line";

  try {
    const response = await axios.get(apiUrl, {
      params: { apikey, amount, codeqr }
    });

    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    return { success: false, message: error.message };
  }
}

module.exports = function (app) {
  app.get('/random/payment', async (req, res) => {
    const { amount, codeqr } = req.query;

    if (!amount) {
      return res.status(400).json({ status: false, error: "Tolong masukkan harganya" });
    }
    if (!codeqr) {
      return res.status(400).json({ status: false, error: "Tolong masukkan codeqr" });
    }

    try {
      const response = await createPayment(amount, codeqr);
      res.status(200).json({
        status: true,
        creator: 'Fukushima',
        data: response.result
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
