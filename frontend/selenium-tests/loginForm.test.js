const { Builder, By, until } = require('selenium-webdriver');

(async function robustLoginFormTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log('Navigating to login page...');
    await driver.get('http://localhost:3000/login');
    
    // Wait for page to fully load
    await driver.wait(until.titleContains(''), 10000); // Adjust based on your page title
    
    console.log('Waiting for React app to render...');
    
    // Wait for the main container to be present
    await driver.wait(until.elementLocated(By.css('section, .container-fluid, form')), 15000);
    
    // Custom wait function for element to be truly interactable
    const waitForInteractable = async (locator, timeout = 15000) => {
      return await driver.wait(async () => {
        try {
          let element = await driver.findElement(locator);
          let isDisplayed = await element.isDisplayed();
          let isEnabled = await element.isEnabled();
          
          // Check if element is not covered by another element
          let isClickable = await driver.executeScript(`
            const element = arguments[0];
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const elementAtPoint = document.elementFromPoint(centerX, centerY);
            return element === elementAtPoint || element.contains(elementAtPoint);
          `, element);
          
          return isDisplayed && isEnabled && isClickable;
        } catch (e) {
          return false;
        }
      }, timeout);
    };
    
    // Wait for form elements to be interactable
    console.log('Waiting for email input to be interactable...');
    await waitForInteractable(By.id('loginEmail'));
    
    console.log('Waiting for password input to be interactable...');
    await waitForInteractable(By.id('loginPassword'));
    
    console.log('Waiting for submit button to be interactable...');
    await waitForInteractable(By.css('button[type="submit"]'));
    
    console.log('All elements are ready for interaction!');
    
    // Get elements
    let emailInput = await driver.findElement(By.id('loginEmail'));
    let passwordInput = await driver.findElement(By.id('loginPassword'));
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));
    
    // Test 1: Empty form validation
    console.log('Test 1: Testing empty form validation...');
    
    // Ensure submit button is in view and click it
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", submitButton);
    await driver.sleep(500);
    
    await driver.actions().move({ origin: submitButton }).click().perform();
    await driver.sleep(2000);
    
    // Check for validation errors
    let errorElements = await driver.findElements(By.css('span[style*="color: red"]'));
    console.log('Number of validation errors:', errorElements.length);
    
    for (let error of errorElements) {
      let errorText = await error.getText();
      if (errorText.trim()) {
        console.log('Validation error:', errorText);
      }
    }
    
    // Test 2: Invalid email format
    console.log('Test 2: Testing invalid email format...');
    
    await driver.actions().move({ origin: emailInput }).click().perform();
    await emailInput.clear();
    await emailInput.sendKeys('invalid-email');
    
    await driver.actions().move({ origin: passwordInput }).click().perform();
    await passwordInput.clear();
    await passwordInput.sendKeys('123'); // Too short
    
    await driver.actions().move({ origin: submitButton }).click().perform();
    await driver.sleep(2000);
    
    errorElements = await driver.findElements(By.css('span[style*="color: red"]'));
    console.log('Validation errors for invalid data:', errorElements.length);
    
    // Test 3: Valid credentials
    console.log('Test 3: Testing with valid format credentials...');
    
    await driver.actions().move({ origin: emailInput }).click().perform();
    await emailInput.clear();
    await emailInput.sendKeys('test@example.com');
    
    await driver.actions().move({ origin: passwordInput }).click().perform();
    await passwordInput.clear();
    await passwordInput.sendKeys('password123');
    
    // Check button text before submission
    let buttonTextBefore = await submitButton.getText();
    console.log('Button text before submit:', buttonTextBefore);
    
    await driver.actions().move({ origin: submitButton }).click().perform();
    
    // Wait for submission to process
    console.log('Waiting for form submission to process...');
    await driver.sleep(3000);
    
    // Check button text after submission (might show loading)
    let buttonTextAfter = await submitButton.getText();
    console.log('Button text after submit:', buttonTextAfter);
    
    // Check for error message or redirect
    try {
      let errorAlert = await driver.findElement(By.css('.alert-danger'));
      let errorText = await errorAlert.getText();
      console.log('Login error message:', errorText);
      console.log('✓ Error handling working correctly');
    } catch (e) {
      console.log('No error alert found');
      
      // Check if URL changed (successful login redirect)
      let currentUrl = await driver.getCurrentUrl();
      console.log('Current URL after login attempt:', currentUrl);
      
      if (!currentUrl.includes('/login')) {
        console.log('✓ Appears to have redirected (login might have succeeded)');
      }
    }
    
    console.log('✓ Login form test completed successfully!');
    
  } catch (err) {
    console.error('Robust test failed:', err);
    
    // Comprehensive debugging
    try {
      console.log('\n=== COMPREHENSIVE DEBUG ===');
      
      let currentUrl = await driver.getCurrentUrl();
      console.log('Current URL:', currentUrl);
      
      // Take a screenshot for debugging
      let screenshot = await driver.takeScreenshot();
      require('fs').writeFileSync('login-form-debug.png', screenshot, 'base64');
      console.log('Screenshot saved as login-form-debug.png');
      
      // Check viewport size
      let windowSize = await driver.manage().window().getRect();
      console.log('Window size:', windowSize);
      
      // Check all form elements
      let allInputs = await driver.findElements(By.tagName('input'));
      let allButtons = await driver.findElements(By.tagName('button'));
      console.log('Total inputs found:', allInputs.length);
      console.log('Total buttons found:', allButtons.length);
      
    } catch (debugErr) {
      console.error('Debug failed:', debugErr);
    }
    
  } finally {
    await driver.quit();
  }
})();
