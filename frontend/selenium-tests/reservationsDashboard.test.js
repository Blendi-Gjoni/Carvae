// File: selenium-tests/ReservationsDashboard.test.js
const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function ReservationsDashboard() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log('→ Navigating to Reservations Dashboard…');
    await driver.get('http://localhost:3000/admin/reservations');
    await driver.sleep(1500);

    // Ensure page has loaded
    await driver.wait(until.elementLocated(By.css('body')), 10000);
    console.log('✓ Body loaded');
    await driver.sleep(1500);

    // Check for the heading
    console.log('→ Waiting for heading…');
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Reservations Dashboard')]")),
      10000
    );
    console.log('✓ Heading visible');
    await driver.sleep(1500);

    // Check that the table (or DashboardTable) is present
    console.log('→ Waiting for table rows…');
    // DashboardTable renders a <table>, so we look for tbody rows
    await driver.wait(until.elementLocated(By.css('table tbody tr')), 10000);
    const rows = await driver.findElements(By.css('table tbody tr'));
    console.log(`Row count: ${rows.length}`);
    await driver.sleep(1500);

    // Verify "Add New Reservation" button
    console.log('→ Waiting for Add New Reservation button…');
    const addBtn = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Add New Reservation')]")),
      10000
    );
    console.log('✓ Button visible');
    await driver.sleep(1500);

    // Click it and verify modal appears
    console.log('→ Clicking Add New Reservation…');
    await addBtn.click();
    await driver.sleep(1500);

    console.log('→ Waiting for modal…');
    await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Add New Reservation')]//ancestor::div[contains(@class,'modal-dialog')]")),
      10000
    );
    console.log('✓ Modal is visible');
    await driver.sleep(1500);

    // Close the modal (click the “×”)
    console.log('→ Closing modal…');
    const closeBtn = await driver.findElement(By.css('.modal-dialog .btn-close'));
    await closeBtn.click();
    console.log('✓ Modal closed');
    await driver.sleep(1500);

    console.log('✓ ReservationsDashboard test completed successfully!');
  } catch (err) {
    console.error('❌ ReservationsDashboard test failed:', err);

    // Save debug artifacts
    const url = await driver.getCurrentUrl();
    console.log('Current URL:', url);

    const shot = await driver.takeScreenshot();
    fs.writeFileSync('reservations-dashboard-debug.png', shot, 'base64');
    console.log('Saved screenshot: reservations-dashboard-debug.png');

    const html = await driver.getPageSource();
    fs.writeFileSync('reservations-dashboard-debug.html', html);
    console.log('Saved HTML snapshot: reservations-dashboard-debug.html');
  } finally {
    await driver.quit();
  }
})();
