const puppeteer = require('puppeteer');

(async () => {
    const votes = 150; // Number of votes to submit

    //const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    console.log("Starting Puppeteer...");

    // Launch Puppeteer browser


    for (let i = 0; i < votes; i++) {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--incognito']
        });

        console.log(`🔄 Submitting vote ${i + 1}...`);

        // Open a new page
        const page = await browser.newPage();
        await page.goto('https://tricicloscanarias.com/general/concurso', { waitUntil: 'networkidle2' });

        let nonce = null;
        let retries = 3;

        while (!nonce && retries > 0) {
            // Extract the correct nonce from the input field with ID "poll_2_nonce"
            nonce = await page.evaluate(() => {
                const input = document.querySelector('#poll_2_nonce');
                return input ? input.value : null;
            });

            if (!nonce) {
                console.log("❌ Nonce not found! Retrying...");
                await page.reload({ waitUntil: 'networkidle2' });
                retries--;
            }
        }

        if (!nonce) {
            console.log("❌ Nonce not found after retries! Skipping vote.");
            await page.close();
            continue;
        }

        console.log(`✅ Vote ${i + 1}: Using nonce ${nonce}`);

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

        // Wait for the AJAX request to complete
        //  await page.waitForResponse(response => response.url().includes('admin-ajax.php') && response.status() === 200);

        // Close the page
        await page.close();

        // Random delay (between 2-5 seconds) to avoid detection
        //await delay(Math.floor(Math.random() * 3000) + 2000);

        // Close the browser after voting
        await browser.close();
    }

    console.log("🎉 All votes submitted successfully!");
})();