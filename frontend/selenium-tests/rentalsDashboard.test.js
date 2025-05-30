const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

(async function rentalsDashboardTest() {
    // Configure Chrome with options
    let options = new chrome.Options();
    // options.headless(); // Uncomment to run headless
    // options.addArguments('--window-size=1920,1080'); // Set window size

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // 1. Navigate to the rentals page
        console.log('Navigating to rentals dashboard...');
        await driver.get('http://localhost:3000/admin/rentals');

        // 2. Wait for page to load (check for h1 title)
        console.log('Waiting for page title...');
        await driver.wait(until.elementLocated(
            By.xpath('//h1[contains(text(), "Rentals Dashboard")]')
        ), 30000);

        // 3. Wait for the table to load
        console.log('Waiting for rentals table...');
        const table = await driver.wait(until.elementLocated(
            By.css('table.table-hover')
        ), 30000);

        // 4. Verify table has rows
        console.log('Checking for table rows...');
        const rows = await table.findElements(By.css('tbody tr'));
        console.log(`Found ${rows.length} rows in the table`);

        if (rows.length === 0) {
            console.log('Table is empty - no rentals found (this might be expected)');
        }

        // --- Test 1: Add New Rental ---
        console.log('Testing "Add New Rental" functionality...');
        const addButton = await driver.findElement(
            By.xpath('//button[contains(., "Add New Rental")]')
        );
        await addButton.click();

        // Wait for modal to appear
        await driver.wait(until.elementLocated(
            By.css('.modal.show')
        ), 5000);

        // Fill out the form
        console.log('Filling out rental form...');
        await driver.findElement(By.css('input[name="name"]')).sendKeys('Test Rental');
        await driver.findElement(By.css('input[name="address"]')).sendKeys('456 Test Ave');
        await driver.findElement(By.css('input[name="city"]')).sendKeys('Test City');
        await driver.findElement(By.css('input[name="state"]')).sendKeys('TS');
        await driver.findElement(By.css('input[name="phoneNumber"]')).sendKeys('9876543210');
        await driver.findElement(By.css('input[name="email"]')).sendKeys('test@rental.com');
        await driver.findElement(By.css('input[name="website"]')).sendKeys('http://test-rental.com');
        await driver.findElement(By.css('input[name="openingHours"]')).sendKeys('8-6 Daily');

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
        console.log('Rental successfully added!');

        // --- Test 2: Verify the new rental appears in table ---
        console.log('Verifying new rental in table...');
        await driver.wait(async () => {
            const currentRows = await driver.findElements(By.css('table.table-hover tbody tr'));
            return currentRows.length > rows.length;
        }, 10000);

        // --- Test 3: Test search functionality ---
        console.log('Testing search functionality...');
        const searchInput = await driver.findElement(By.css('input[placeholder="Search..."]'));
        await searchInput.sendKeys('Test Rental');

        // Wait for filtered results
        await driver.wait(async () => {
            const filteredRows = await driver.findElements(By.css('table.table-hover tbody tr'));
            return filteredRows.length === 1;
        }, 5000);

        // Clear search
        await searchInput.clear();

        // --- Test 4: Test city filter functionality ---
        console.log('Testing city filter functionality...');
        const citySelect = await driver.findElement(By.css('select.form-select'));

        // Get all city options
        const cityOptions = await citySelect.findElements(By.css('option'));
        if (cityOptions.length > 1) { // Skip the "All Rentals" option
            // Select the first city option (skip index 0 which is "All Rentals")
            await citySelect.findElement(By.css('option:nth-child(2)')).click();

            // Wait for table to update with filtered results
            await driver.wait(async () => {
                const cityFilteredRows = await driver.findElements(By.css('table.table-hover tbody tr'));
                return cityFilteredRows.length > 0; // Assuming at least one rental exists for the selected city
            }, 5000);

            // Reset to "All Rentals"
            await citySelect.findElement(By.css('option:first-child')).click();
        }

        // --- Test 5: Test edit functionality ---
        console.log('Testing edit functionality...');
        const editButtons = await driver.findElements(By.xpath('//button[contains(., "Edit")]'));
        if (editButtons.length > 0) {
            await editButtons[0].click();

            // Wait for edit modal
            await driver.wait(until.elementLocated(By.css('.modal.show')), 5000);

            // Modify a field
            const nameField = await driver.findElement(By.css('input[name="name"]'));
            await nameField.clear();
            await nameField.sendKeys('Updated Test Rental');

            // Save changes
            const updateButton = await driver.findElement(
                By.xpath('//button[contains(., "Save") and not(@disabled)]')
            );
            await updateButton.click();

            // Wait for modal to close
            await driver.wait(until.stalenessOf(updateButton), 10000);
            console.log('Rental successfully updated!');
        }

        // --- Test 6: Test delete functionality ---
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
            console.log('Rental successfully deleted!');
        }

        console.log('All tests completed successfully!');

    } catch (err) {
        console.error('TEST FAILED:', err);

    } finally {
        await driver.quit();
    }
})();