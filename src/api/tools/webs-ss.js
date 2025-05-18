const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

module.exports = function (app) {
  app.get('/tools/web-screenshot', async (req, res) => {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ status: false, error: 'Parameter "url" diperlukan' });
    }

    try {
      const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });

      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      const screenshotBuffer = await page.screenshot({ fullPage: true });

      await browser.close();

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': screenshotBuffer.length,
      });
      res.end(screenshotBuffer);

    } catch (error) {
      console.error('Error taking screenshot:', error);
      res.status(500).json({ status: false, error: 'Gagal mengambil screenshot' });
    }
  });
};
