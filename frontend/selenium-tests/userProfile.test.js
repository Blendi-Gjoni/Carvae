const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function UserProfile() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log('→ Navigating to User Profile…');
    await driver.get('http://localhost:3000/user-profile');
    await driver.sleep(1500);

    // Wait for profile to load (username header)
    await driver.wait(until.elementLocated(By.css('.user-name')), 10000);
    const nameText = await driver.findElement(By.css('.user-name')).getText();
    console.log('Username:', nameText);
    await driver.sleep(1000);

    // Check email display
    const emailText = await driver.findElement(By.css('.user-email')).getText();
    console.log('Email:', emailText);
    await driver.sleep(1000);

    // Check input fields
    const usernameInput = await driver.findElement(By.id('username'));
    const emailInput    = await driver.findElement(By.id('email'));
    const roleInput     = await driver.findElement(By.id('role'));

    console.log('Input#username value:', await usernameInput.getAttribute('value'));
    console.log('Input#email value:   ', await emailInput.getAttribute('value'));
    console.log('Input#role value:    ', await roleInput.getAttribute('value'));
    await driver.sleep(1500);

    // Verify Sign Out button is present and clickable
    const signOutBtn = await driver.findElement(By.xpath("//button[text()='Sign Out']"));
    console.log('✓ Sign Out button found');
    await driver.sleep(500);

    // Click Sign Out and verify redirect to /login
    console.log('→ Clicking Sign Out…');
    await signOutBtn.click();
    await driver.sleep(1500);

    await driver.wait(until.urlContains('/login'), 10000);
    console.log('✓ Redirected to login page:', await driver.getCurrentUrl());
    await driver.sleep(1000);

    console.log('✓ UserProfile test completed successfully!');

  } catch (err) {
    console.error('❌ UserProfile test failed:', err);

    // Save debug artifacts
    const url = await driver.getCurrentUrl();
    console.log('Current URL:', url);

    const shot = await driver.takeScreenshot();
    fs.writeFileSync('userprofile-debug.png', shot, 'base64');
    console.log('Saved screenshot: userprofile-debug.png');

    const html = await driver.getPageSource();
    fs.writeFileSync('userprofile-debug.html', html);
    console.log('Saved HTML snapshot: userprofile-debug.html');
  } finally {
    await driver.quit();
  }
})();
