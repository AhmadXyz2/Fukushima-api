const axios = require('axios');

const getMobileLegendsProfile = async (userId, zoneId) => {
  try {
    const response = await axios.post(
      "https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store",
      new URLSearchParams({
        productId: "1",
        itemId: "2",
        catalogId: "57",
        paymentId: "352",
        gameId: userId,
        zoneId: zoneId,
        product_ref: "REG",
        product_ref_denom: "AE"
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "https://www.duniagames.co.id/",
          Accept: "application/json"
        }
      }
    );

    const { data } = response.data;

    return {
      status: 200,
      userId,
      zoneId,
      nickname: data?.gameDetail?.userName || "Unknown"
    };
  } catch (error) {
    return {
      status: 404,
      message: "User ID atau Zone ID tidak ditemukan"
    };
  }
};

module.exports = function(app) {
  app.get('/tools/ml', async (req, res) => {
    const { id, zone } = req.query;

    if (!id || !zone) {
      return res.status(400).json({
        status: false,
        message: "Parameter 'id' dan 'zone' wajib diisi"
      });
    }

    const result = await getMobileLegendsProfile(id, zone);
    res.status(result.status).json(result);
  });
};
