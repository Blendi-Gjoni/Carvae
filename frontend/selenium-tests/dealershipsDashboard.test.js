const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function dealershipsDashboardTest() {
    // Configure Chrome with options
    let options = new chrome.Options();
    // options.headless(); // Uncomment to run headless
    // options.addArguments('--window-size=1920,1080'); // Set window size

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // 1. Navigate to the dealerships page
        console.log('Navigating to dealerships dashboard...');
        await driver.get('http://localhost:3000/admin/dealerships');

        // 2. Wait for page to load (check for h1 title)
        console.log('Waiting for page title...');
        await driver.wait(until.elementLocated(
            By.xpath('//h1[contains(text(), "Dealerships Dashboard")]')
        ), 30000);

        // 3. Wait for the table to load
        console.log('Waiting for dealerships table...');
        const table = await driver.wait(until.elementLocated(
            By.css('table.table-hover')
        ), 30000);

        // 4. Verify table has rows
        console.log('Checking for table rows...');
        const rows = await table.findElements(By.css('tbody tr'));
        console.log(`Found ${rows.length} rows in the table`);

        if (rows.length === 0) {
            console.log('Table is empty - no dealerships found (this might be expected)');
        }

        // --- Test 1: Add New Dealership ---
        console.log('Testing "Add New Dealership" functionality...');
        const addButton = await driver.findElement(
            By.xpath('//button[contains(., "Add New Dealership")]')
        );
        await addButton.click();

        // Wait for modal to appear
        await driver.wait(until.elementLocated(
            By.css('.modal.show')
        ), 5000);

        // Fill out the form
        console.log('Filling out dealership form...');
        await driver.findElement(By.css('input[name="name"]')).sendKeys('Test Dealership');
        await driver.findElement(By.css('input[name="address"]')).sendKeys('123 Test St');
        await driver.findElement(By.css('input[name="city"]')).sendKeys('Testville');
        await driver.findElement(By.css('input[name="state"]')).sendKeys('TS');
        await driver.findElement(By.css('input[name="phoneNumber"]')).sendKeys('1234567890');
        await driver.findElement(By.css('input[name="email"]')).sendKeys('test@dealership.com');
        await driver.findElement(By.css('input[name="website"]')).sendKeys('http://test.com');
        await driver.findElement(By.css('input[name="openingHours"]')).sendKeys('9-5 Mon-Fri');

        // Handle file upload (if needed)
        // const fileInput = await driver.findElement(By.css('input[type="file"]'));
        // await fileInput.sendKeys('/path/to/test/image.jpg');

        // Submit the form
        const saveButton = await driver.findElement(
            By.xpath('//button[contains(., "Save") and not(@disabled)]')
        );
        await saveButton.click();

        // Wait for modal to close
        await driver.wait(until.stalenessOf(saveButton), 10000);
        console.log('Dealership successfully added!');

        // --- Test 2: Verify the new dealership appears in table ---
        console.log('Verifying new dealership in table...');
        await driver.wait(async () => {
            const currentRows = await driver.findElements(By.css('table.table-hover tbody tr'));
            return currentRows.length > rows.length;
        }, 10000);

        // --- Test 3: Test search functionality ---
        console.log('Testing search functionality...');
        const searchInput = await driver.findElement(By.css('input[placeholder="Search..."]'));
        await searchInput.sendKeys('Test Dealership');

        // Wait for filtered results
        await driver.wait(async () => {
            const filteredRows = await driver.findElements(By.css('table.table-hover tbody tr'));
            return filteredRows.length === 1;
        }, 5000);

        // --- Test 4: Test edit functionality ---
        console.log('Testing edit functionality...');
        const editButtons = await driver.findElements(By.xpath('//button[contains(., "Edit")]'));
        if (editButtons.length > 0) {
            await editButtons[0].click();

            // Wait for edit modal
            await driver.wait(until.elementLocated(By.css('.modal.show')), 5000);

            // Modify a field
            const nameField = await driver.findElement(By.css('input[name="name"]'));
            await nameField.clear();
            await nameField.sendKeys('Updated Test Dealership');

            // Save changes
            const updateButton = await driver.findElement(
                By.xpath('//button[contains(., "Save") and not(@disabled)]')
            );
            await updateButton.click();

            // Wait for modal to close
            await driver.wait(until.stalenessOf(updateButton), 10000);
            console.log('Dealership successfully updated!');
        }

        // --- Test 5: Test delete functionality ---
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
            console.log('Dealership successfully deleted!');
        }

        console.log('All tests completed successfully!');

    } catch (err) {
        console.error('TEST FAILED:', err);

    } finally {
        await driver.quit();
    }
})();