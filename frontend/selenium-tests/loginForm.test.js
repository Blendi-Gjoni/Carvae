const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function loginFormTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log('Navigating to login page...');
    await driver.get('http://localhost:3000/login');
    
    // Wait for page to load
    await driver.wait(until.elementLocated(By.css('body')), 10000);
    
    // Try multiple selectors for form elements
    const emailSelectors = [
      '#loginEmail',
      'input[type="email"]',
      'input[name*="email"]',
      'input[placeholder*="email" i]'
    ];
    
    const passwordSelectors = [
      '#loginPassword',
      'input[type="password"]',
      'input[name*="password"]',
      'input[placeholder*="password" i]'
    ];
    
    const submitSelectors = [
      'button[type="submit"]',
      'input[type="submit"]',
      'button[class*="submit"]'
    ];
    
    let emailInput, passwordInput, submitButton;
    
    // Find form elements
    for (let selector of emailSelectors) {
      try {
        emailInput = await driver.findElement(By.css(selector));
        break;
      } catch (e) {}
    }
    
    for (let selector of passwordSelectors) {
      try {
        passwordInput = await driver.findElement(By.css(selector));
        break;
      } catch (e) {}
    }
    
    for (let selector of submitSelectors) {
      try {
        submitButton = await driver.findElement(By.css(selector));
        break;
      } catch (e) {}
    }
    
    if (!emailInput || !passwordInput || !submitButton) {
      throw new Error('Required form elements not found');
    }
    
    console.log('Form elements found, waiting for interactability...');
    
    // Wait for elements to be interactable
    await driver.wait(until.elementIsVisible(emailInput), 5000);
    await driver.wait(until.elementIsEnabled(emailInput), 5000);
    await driver.wait(until.elementIsVisible(passwordInput), 5000);
    await driver.wait(until.elementIsEnabled(passwordInput), 5000);
    await driver.wait(until.elementIsVisible(submitButton), 5000);
    await driver.wait(until.elementIsEnabled(submitButton), 5000);
    
    console.log('Testing login with super admin credentials...');
    
    // Fill form and submit
    await emailInput.clear();
    await emailInput.sendKeys('super.admin@email.com');
    
    await passwordInput.clear();
    await passwordInput.sendKeys('123456');
    
    await submitButton.click();
    
    // Wait for response
    await driver.sleep(3000);
    
    // Check result
    try {
      let errorAlert = await driver.findElement(By.css('.alert-danger, .error, [class*="error"]'));
      let errorText = await errorAlert.getText();
      console.log('❌ Login failed:', errorText);
    } catch (e) {
      let currentUrl = await driver.getCurrentUrl();
      
      if (!currentUrl.includes('/login')) {
        console.log('✅ Login successful - redirected to:', currentUrl);
      } else {
        console.log('⚠️ Login status unclear - still on login page');
      }
    }
    
  } catch (err) {
    console.error('❌ Test failed:', err.message);
    
    // Take screenshot for debugging
    try {
      let screenshot = await driver.takeScreenshot();
      fs.writeFileSync('login-test-error.png', screenshot, 'base64');
      console.log('Screenshot saved: login-test-error.png');
    } catch (screenshotErr) {
      console.error('Could not take screenshot');
    }
    
  } finally {
    await driver.quit();
  }
})();
