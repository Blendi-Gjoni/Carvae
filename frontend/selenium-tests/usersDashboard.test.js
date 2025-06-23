// File: selenium-tests/UsersDashboard.test.js
const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function UsersDashboard() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log('→ Navigating to Users Dashboard…');
    await driver.get('http://localhost:3000/admin/users');
    await driver.sleep(1500);

    // Ensure React has mounted
    await driver.wait(until.elementLocated(By.css('body')), 10000);
    console.log('✓ Body loaded');
    await driver.sleep(1500);

    // Check for the heading
    console.log('→ Waiting for heading…');
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Users Dashboard')]")),
      10000
    );
    console.log('✓ Heading visible');
    await driver.sleep(1500);

    // Check that the table is present
    console.log('→ Waiting for table…');
    await driver.wait(until.elementLocated(By.css('table.table')), 10000);
    console.log('✓ Table present');
    await driver.sleep(1500);

    // Verify there are exactly two data rows
    console.log('→ Counting rows…');
    const rows = await driver.findElements(By.css('table tbody tr'));
    console.log(`Row count: ${rows.length}`);
    await driver.sleep(1500);

    if (rows.length === 2) {
      console.log('✓ Correct number of rows (2)');
    } else {
      console.error(`✗ Expected 2 rows, found ${rows.length}`);
    }
    await driver.sleep(1500);

    console.log('✓ UsersDashboard test completed successfully!');
    await driver.sleep(1500);

  } catch (err) {
    console.error('❌ UsersDashboard test failed:', err);

    // Save debug artifacts
    const url = await driver.getCurrentUrl();
    console.log('Current URL:', url);

    const shot = await driver.takeScreenshot();
    fs.writeFileSync('users-dashboard-debug.png', shot, 'base64');
    console.log('Saved screenshot: users-dashboard-debug.png');

    const html = await driver.getPageSource();
    fs.writeFileSync('dashboard-debug.html', html);
    console.log('Saved HTML snapshot: dashboard-debug.html');
  } finally {
    await driver.quit();
  }
})();
