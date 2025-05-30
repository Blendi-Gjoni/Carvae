const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function ordersDashboardTest() {
    // Configure Chrome with options
    let options = new chrome.Options();
    // options.headless(); // Uncomment to run headless
    // options.addArguments('--window-size=1920,1080'); // Set window size

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // 1. Navigate to the orders page
        console.log('Navigating to orders dashboard...');
        await driver.get('http://localhost:3000/admin/orders');

        // 2. Wait for page to load (check for h1 title)
        console.log('Waiting for page title...');
        await driver.wait(until.elementLocated(
            By.xpath('//h1[contains(text(), "Orders Dashboard")]')
        ), 30000);

        // 3. Wait for the table to load (using the actual HTML structure from your debug output)
        console.log('Waiting for orders table...');
        const table = await driver.wait(until.elementLocated(
            By.css('table.table-hover') // Using the actual class from your component
        ), 30000);

        // 4. Verify table has rows
        console.log('Checking for table rows...');
        const rows = await table.findElements(By.css('tbody tr'));
        console.log(`Found ${rows.length} rows in the table`);

        if (rows.length === 0) {
            throw new Error('Table is empty - no orders found');
        }

        // --- Test 1: Add New Order ---
        console.log('Testing "Add New Order" functionality...');
        const addButton = await driver.findElement(
            By.xpath('//button[contains(., "Add New Order")]')
        );
        await addButton.click();

        // Wait for modal to appear
        await driver.wait(until.elementLocated(
            By.css('.modal.show')
        ), 5000);

        // Fill out the form
        console.log('Filling out order form...');
        const userSelect = await driver.findElement(By.css('select[name="userId"]'));
        await userSelect.findElement(By.css('option:nth-child(2)')).click();

        const carSelect = await driver.findElement(By.css('select[name="carId"]'));
        await carSelect.findElement(By.css('option:nth-child(2)')).click();

        const dealershipSelect = await driver.findElement(By.css('select[name="dealershipId"]'));
        await dealershipSelect.findElement(By.css('option:nth-child(2)')).click();

        // Submit the form
        const saveButton = await driver.findElement(
            By.xpath('//button[contains(., "Save") and not(@disabled)]')
        );
        await saveButton.click();

        // Wait for modal to close
        await driver.wait(until.stalenessOf(saveButton), 10000);
        console.log('Order successfully added!');

        // --- Test 2: Verify the new order appears in table ---
        console.log('Verifying new order in table...');
        await driver.wait(async () => {
            const currentRows = await driver.findElements(By.css('table.table-hover tbody tr'));
            return currentRows.length > rows.length;
        }, 10000);

        console.log('All tests completed successfully!');

    } catch (err) {
        console.error('TEST FAILED:', err);


    } finally {
        await driver.quit();
    }
})();