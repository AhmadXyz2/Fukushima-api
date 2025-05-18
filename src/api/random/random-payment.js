const axios = require('axios');

async function createPayment(amount, codeqr) {
    const apiUrl = "https://linecloud.my.id/api/orkut/createpayment";
    const apikey = "Line";

    try {
        const response = await axios.get(apiUrl, {
            params: {
                apikey,
                amount,
                codeqr
            },
            timeout: 10000
        });

        console.log("API Response:", response.data); // Debug response

        // Tangani kalau format response tidak sesuai ekspektasi
        if (typeof response.data.success === 'undefined') {
            throw new Error("Response tidak sesuai format");
        }

        if (!response.data.success) {
            throw new Error(response.data.message || 'Gagal membuat pembayaran');
        }

        return response.data;

    } catch (error) {
        console.error("Error saat createPayment:", error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.message || error.message
        };
    }
}

module.exports = function(app) {
    app.get('/random/payment', async (req, res) => {
        const { amount, codeqr } = req.query;

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            return res.status(400).json({
                status: false,
                error: "Tolong masukkan jumlah harga yang valid (angka > 0)"
            });
        }

        if (!codeqr || codeqr.trim() === '') {
            return res.status(400).json({
                status: false,
                error: "Tolong masukkan codeqr yang valid"
            });
        }

        try {
            const result = await createPayment(amount, codeqr);

            if (!result.success) {
                return res.status(400).json({
                    status: false,
                    error: result.message || 'Gagal membuat pembayaran'
                });
            }

            res.status(200).json({
                status: true,
                creator: 'ikann',
                data: result
            });

        } catch (error) {
            console.error("Server Error:", error);
            res.status(500).json({
                status: false,
                error: "Terjadi kesalahan server"
            });
        }
    });
};