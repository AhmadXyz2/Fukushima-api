const axios = require('axios');

module.exports = function(app) {
    async function fetchNSFWImage() {
        try {
            // First get the image URL from the API
            const { data: imageData } = await axios.get('https://api.waifu.pics/nsfw/neko');
            
            // Check if we got a valid response
            if (!imageData || !imageData.url) {
                throw new Error('Invalid API response: No image URL found');
            }

            // Fetch the actual image
            const response = await axios.get(imageData.url, { 
                responseType: 'arraybuffer',
                timeout: 5000 // 5 seconds timeout
            });
            
            // Validate the image data
            if (!response.data || response.data.length === 0) {
                throw new Error('Empty image data received');
            }

            return Buffer.from(response.data);
        } catch (error) {
            console.error('[NSFW API Error]', error.message);
            throw new Error(`Failed to fetch image: ${error.message}`);
        }
    }

    app.get('/random/nsfw', async (req, res) => {
        try {
            const imageBuffer = await fetchNSFWImage();
            
            // Validate the image buffer
            if (!imageBuffer || imageBuffer.length === 0) {
                throw new Error('Empty image buffer');
            }

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': imageBuffer.length,
            });
            res.end(imageBuffer);
        } catch (error) {
            console.error('[Endpoint Error]', error.message);
            res.status(500).json({
                success: false,
                error: 'Failed to process your request',
                message: error.message,
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    });
};