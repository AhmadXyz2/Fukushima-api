const axios = require('axios');

async function createPayment(amount, codeqr) {
    const apiUrl = "https://linecloud.my.id/api/orkut/createpayment";
    const apikey = "Line";

    try {
        const response = await axios.get(apiUrl, {
            params: {
                apikey: apikey,
                amount: amount,
                codeqr: codeqr
            },
            timeout: 10000 // 10 seconds timeout
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (!response.data.success) {
            throw new Error(response.data.message || 'Failed to create payment');
        }

        return response.data;
    } catch (error) {
        console.error("Error creating payment:", error);
        return { 
            success: false, 
            message: error.response?.data?.message || error.message 
        };
    }
}

module.exports = function(app) {
    app.get('/random/payment', async (req, res) => {
        const { amount, codeqr } = req.query;

        // Validate input parameters
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ 
                status: false, 
                error: "Tolong masukkan jumlah harga yang valid" 
            });
        }
        
        if (!codeqr || codeqr.trim() === '') {
            return res.status(400).json({ 
                status: false, 
                error: "Tolong masukkan codeqr yang valid" 
            });
        }

        try {
            const response = await createPayment(amount, codeqr);
            
            if (!response.success) {
                return res.status(400).json({
                    status: false,
                    error: response.message || 'Gagal membuat pembayaran'
                });
            }
            
            res.status(200).json({
                status: true,
                creator: 'ikann',
                data: response
            });
        } catch (error) {
            console.error("Server error:", error);
            res.status(500).json({ 
                status: false, 
                error: 'Terjadi kesalahan server' 
            });
        }
    });
};
