const puppeteer = require('puppeteer');

(async () => {
    const votes = 10; // Number of votes to submit
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    console.log("Starting Puppeteer...");

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--incognito']
    });

    for (let i = 0; i < votes; i++) {
        console.log(`🔄 Submitting vote ${i + 1}...`);

        // Open a new page
        const page = await browser.newPage();
        await page.goto('https://tricicloscanarias.com/general/concurso', { waitUntil: 'networkidle2' });

        console.log(`✅ Vote ${i + 1}`);

        // Select the radio button by its ID
        await page.evaluate(() => {
            const radioButton = document.querySelector('#poll-answer-16');
            if (radioButton) {
                radioButton.click();
            }
        });

        // Click the "votar" button by its name attribute
        await page.evaluate(() => {
            const votarButton = document.querySelector('input[name="vote"]');
            if (votarButton) {
                votarButton.click();
            }
        });

        // Close the page
        await page.close();

        // Random delay (between 2-5 seconds) to avoid detection
        //await delay(Math.floor(Math.random() * 3000) + 2000);
    }

    // Close the browser after voting
    await browser.close();
    console.log("🎉 All votes submitted successfully!");
})();