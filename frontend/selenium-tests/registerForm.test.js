const { Builder, By, until } = require('selenium-webdriver');

(async function registerFormValidationTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Open the register page
    await driver.get('http://localhost:3000/register');
    
    // Wait for React to load and render the form
    console.log('Waiting for React app to load...');
    
    // Wait for the root div to have content (React app loaded)
    await driver.wait(until.elementLocated(By.id('root')), 10000);
    
    // Wait specifically for the register form to be rendered
    console.log('Waiting for register form to render...');
    await driver.wait(until.elementLocated(By.id('registerUsername')), 15000);
    await driver.wait(until.elementLocated(By.id('submit-button')), 15000);
    
    console.log('Register form loaded successfully!');

    // --- Test 1: Submit empty form, expect required field errors ---
    console.log('Test 1: Submitting empty form...');

    // Wait for submit button to be clickable
    let submitButton = await driver.wait(until.elementIsEnabled(driver.findElement(By.id('submit-button'))), 5000);
    await submitButton.click();

    // Wait for errors to appear with longer timeout
    console.log('Waiting for validation errors...');
    await driver.wait(until.elementLocated(By.id('username-error')), 8000);
    
    // Wait a bit more for all errors to render
    await driver.sleep(1000);

    // Check error messages
    let usernameError = await driver.findElement(By.id('username-error')).getText();
    console.log('Username error:', usernameError);

    let emailError = await driver.findElement(By.id('email-error')).getText();
    console.log('Email error:', emailError);

    let passwordError = await driver.findElement(By.id('password-error')).getText();
    console.log('Password error:', passwordError);

    let repeatPasswordError = await driver.findElement(By.id('repeatPassword-error')).getText();
    console.log('Repeat password error:', repeatPasswordError);

    let termsError = await driver.findElement(By.id('termsAccepted-error')).getText();
    console.log('Terms error:', termsError);

    // --- Test 2: Fill invalid data and check validation ---
    console.log('Test 2: Testing invalid data validation...');

    // Fill username too short
    let username = await driver.findElement(By.id('registerUsername'));
    await username.clear();
    await username.sendKeys('user1'); // less than 8 chars

    // Fill invalid email
    let email = await driver.findElement(By.id('registerEmail'));
    await email.clear();
    await email.sendKeys('invalid-email');

    // Fill password and repeatPassword mismatch
    let password = await driver.findElement(By.id('registerPassword'));
    await password.clear();
    await password.sendKeys('pass123');

    let repeatPassword = await driver.findElement(By.id('registerRepeatPassword'));
    await repeatPassword.clear();
    await repeatPassword.sendKeys('pass124'); // Different from password

    // Ensure terms are unchecked
    let terms = await driver.findElement(By.id('termsAccepted'));
    let checked = await terms.isSelected();
    if (checked) {
      await terms.click();
    }

    // Submit again
    await driver.findElement(By.id('submit-button')).click();

    // Wait for error messages to update
    await driver.sleep(2000);

    // Check all validation error messages
    usernameError = await driver.findElement(By.id('username-error')).getText();
    console.log('Username error (short):', usernameError);

    emailError = await driver.findElement(By.id('email-error')).getText();
    console.log('Email error (invalid):', emailError);

    repeatPasswordError = await driver.findElement(By.id('repeatPassword-error')).getText();
    console.log('Password mismatch error:', repeatPasswordError);

    termsError = await driver.findElement(By.id('termsAccepted-error')).getText();
    console.log('Terms error:', termsError);

    // --- Test 3: Fill valid data and submit ---
    console.log('Test 3: Testing valid data submission...');

    await username.clear();
    await username.sendKeys('validuser123');

    await email.clear();
    await email.sendKeys('valid@example.com');

    await password.clear();
    await password.sendKeys('validpass123');

    await repeatPassword.clear();
    await repeatPassword.sendKeys('validpass123'); // Match password

    // Accept terms
    checked = await terms.isSelected();
    if (!checked) {
      await terms.click();
    }

    // Submit form
    await driver.findElement(By.id('submit-button')).click();

    // Wait a moment to see if form submits successfully
    await driver.sleep(3000);

    console.log('Register form validation tests completed successfully!');

  } catch (err) {
    console.error('Test failed:', err);
    
    // Enhanced debug information
    try {
      console.log('\n=== DEBUG INFORMATION ===');
      let currentUrl = await driver.getCurrentUrl();
      console.log('Current URL:', currentUrl);
      
      // Check if we can find any form elements
      let inputs = await driver.findElements(By.tagName('input'));
      console.log('Number of input elements found:', inputs.length);
      
      let buttons = await driver.findElements(By.tagName('button'));
      console.log('Number of button elements found:', buttons.length);
      
      // Check for React root
      try {
        let root = await driver.findElement(By.id('root'));
        let rootContent = await root.getAttribute('innerHTML');
        console.log('Root element content length:', rootContent.length);
        console.log('Root contains "register":', rootContent.toLowerCase().includes('register'));
      } catch (e) {
        console.log('Root element not found or empty');
      }
      
    } catch (debugErr) {
      console.error('Debug failed:', debugErr);
    }
    
  } finally {
    await driver.quit();
  }
})();
