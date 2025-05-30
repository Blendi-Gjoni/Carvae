const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

(async function carsDashboardTest() {
    // Configure Chrome with options
    let options = new chrome.Options();
    // options.headless(); // Uncomment to run headless
    // options.addArguments('--window-size=1920,1080'); // Set window size

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // 1. Navigate to the cars page
        console.log('Navigating to cars dashboard...');
        await driver.get('http://localhost:3000/admin/cars');

        // 2. Wait for page to load (check for h1 title)
        console.log('Waiting for page title...');
        await driver.wait(until.elementLocated(
            By.xpath('//h1[contains(text(), "Cars Dashboard")]')
        ), 30000);

        // 3. Wait for the table to load
        console.log('Waiting for cars table...');
        const table = await driver.wait(until.elementLocated(
            By.css('table.table-hover')
        ), 30000);

        // 4. Verify table has rows
        console.log('Checking for table rows...');
        const rows = await table.findElements(By.css('tbody tr'));
        console.log(`Found ${rows.length} rows in the table`);

        if (rows.length === 0) {
            console.log('Table is empty - no cars found (this might be expected)');
        }

        // --- Test 1: Add New Car ---
        console.log('Testing "Add New Car" functionality...');
        const addButton = await driver.findElement(
            By.xpath('//button[contains(., "Add New Car")]')
        );
        await addButton.click();

        // Verify navigation to add car page
        await driver.wait(until.urlContains('/admin/add-car'), 5000);
        console.log('Successfully navigated to add car page');

        // Go back to dashboard for remaining tests
        await driver.navigate().back();
        await driver.wait(until.elementLocated(
            By.xpath('//h1[contains(text(), "Cars Dashboard")]')
        ), 5000);

        // --- Test 2: Test delete functionality ---
        console.log('Testing delete functionality...');
        const deleteButtons = await driver.findElements(By.xpath('//button[contains(., "Delete")]'));

        if (deleteButtons.length > 0) {
            const initialCount = (await driver.findElements(By.css('table.table-hover tbody tr'))).length;
            await deleteButtons[0].click();

            // Wait for confirmation (if your app has one)
            // await driver.wait(until.alertIsPresent(), 5000);
            // await driver.switchTo().alert().accept();

            // Wait for row count to decrease
            await driver.wait(async () => {
                const currentRows = await driver.findElements(By.css('table.table-hover tbody tr'));
                return currentRows.length < initialCount;
            }, 10000);
            console.log('Car successfully deleted!');
        }

        // --- Test 3: Verify table columns ---
        console.log('Verifying table columns...');
        const headers = await driver.findElements(By.css('table.table-hover thead th'));
        const expectedHeaders = [
            'ID', 'Model', 'Year', 'Horsepower', 'Kilometers', 'Description',
            'Exterior', 'Interior', 'Fuel Type', 'Transmission', 'Category',
            'Price', 'Image', 'Actions'
        ];

        assert.strictEqual(headers.length, expectedHeaders.length,
            `Expected ${expectedHeaders.length} columns but found ${headers.length}`);

        for (let i = 0; i < headers.length; i++) {
            const headerText = await headers[i].getText();
            assert.strictEqual(headerText, expectedHeaders[i],
                `Column ${i} header mismatch. Expected "${expectedHeaders[i]}" but found "${headerText}"`);
        }
        console.log('All table columns verified successfully');

        // --- Test 4: Verify image display ---
        if (rows.length > 0) {
            console.log('Verifying image display...');
            const firstImageCell = await driver.findElement(By.css('table.table-hover tbody tr:first-child td:nth-child(13)'));
            const image = await firstImageCell.findElements(By.css('img'));

            if (image.length > 0) {
                const imageSrc = await image[0].getAttribute('src');
                assert.ok(imageSrc, 'Image source should not be empty');
                console.log('Image displayed with src:', imageSrc);
            } else {
                const noImageText = await firstImageCell.getText();
                assert.strictEqual(noImageText.trim(), 'No Image',
                    'Expected "No Image" text when no image is present');
                console.log('No image displayed (as expected)');
            }
        }

        console.log('All tests completed successfully!');

    } catch (err) {
        console.error('TEST FAILED:', err);

        // Take screenshot for debugging
        await driver.takeScreenshot().then((image) => {
            require('fs').writeFileSync('cars-test-failure.png', image, 'base64');
            console.log('Screenshot saved as cars-test-failure.png');
        });

        // Additional debugging
        try {
            const pageSource = await driver.getPageSource();
            require('fs').writeFileSync('cars-page-source.html', pageSource);
            console.log('Page source saved as cars-page-source.html');
        } catch (debugErr) {
            console.error('Failed to save page source:', debugErr);
        }

    } finally {
        await driver.quit();
    }
})();