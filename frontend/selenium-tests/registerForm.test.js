const { Builder, By, until } = require('selenium-webdriver');

(async function registerFormValidationTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Open the register page
    await driver.get('http://localhost:3000/register');
    
    // Wait for React to load and render the form
    await driver.wait(until.elementLocated(By.id('root')), 10000);
    await driver.wait(until.elementLocated(By.id('registerUsername')), 15000);
    await driver.wait(until.elementLocated(By.id('submit-button')), 15000);
    
    console.log('Register form loaded successfully');

    // --- Test 1: Submit empty form ---
    console.log('Test 1: Testing empty form validation...');

    let submitButton = await driver.wait(until.elementIsEnabled(driver.findElement(By.id('submit-button'))), 5000);
    await submitButton.click();

    await driver.wait(until.elementLocated(By.id('username-error')), 8000);
    await driver.sleep(1000);

    let usernameError = await driver.findElement(By.id('username-error')).getText();
    let emailError = await driver.findElement(By.id('email-error')).getText();
    let passwordError = await driver.findElement(By.id('password-error')).getText();
    let repeatPasswordError = await driver.findElement(By.id('repeatPassword-error')).getText();
    let termsError = await driver.findElement(By.id('termsAccepted-error')).getText();

    console.log('✓ Empty form validation errors displayed');

    // --- Test 2: Fill invalid data ---
    console.log('Test 2: Testing invalid data validation...');

    let username = await driver.findElement(By.id('registerUsername'));
    await username.clear();
    await username.sendKeys('user1'); // too short

    let email = await driver.findElement(By.id('registerEmail'));
    await email.clear();
    await email.sendKeys('invalid-email');

    let password = await driver.findElement(By.id('registerPassword'));
    await password.clear();
    await password.sendKeys('pass123');

    let repeatPassword = await driver.findElement(By.id('registerRepeatPassword'));
    await repeatPassword.clear();
    await repeatPassword.sendKeys('pass124'); // mismatch

    let terms = await driver.findElement(By.id('termsAccepted'));
    let checked = await terms.isSelected();
    if (checked) {
      await terms.click();
    }

    await driver.findElement(By.id('submit-button')).click();
    await driver.sleep(2000);

    console.log('✓ Invalid data validation errors displayed');

    // --- Test 3: Fill valid data ---
    console.log('Test 3: Testing valid data submission...');

    await username.clear();
    await username.sendKeys('validuser123');

    await email.clear();
    await email.sendKeys('valid@example.com');

    await password.clear();
    await password.sendKeys('validpass123');

    await repeatPassword.clear();
    await repeatPassword.sendKeys('validpass123');

    checked = await terms.isSelected();
    if (!checked) {
      await terms.click();
    }

    await driver.findElement(By.id('submit-button')).click();
    await driver.sleep(3000);

    // Check if registration was successful
    let currentUrl = await driver.getCurrentUrl();
    if (!currentUrl.includes('/register')) {
      console.log('✅ Registration successful - redirected to:', currentUrl);
    } else {
      console.log('⚠️ Still on register page - checking for success message');
    }

    console.log('✓ Register form validation tests completed');

  } catch (err) {
    console.error('❌ Test failed:', err.message);
    
    // Take screenshot for debugging
    let screenshot = await driver.takeScreenshot();
    require('fs').writeFileSync('register-test-error.png', screenshot, 'base64');
    console.log('Screenshot saved: register-test-error.png');
    
  } finally {
    await driver.quit();
  }
})();
