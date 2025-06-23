const { Builder, By, until } = require('selenium-webdriver');

(async function loginFormTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log('Navigating to login page...');
    await driver.get('http://localhost:3000/login');
    
    // Wait for React app to render
    await driver.wait(until.elementLocated(By.css('section, .container-fluid, form')), 15000);
    
    // Custom wait function for element to be interactable
    const waitForInteractable = async (locator, timeout = 15000) => {
      return await driver.wait(async () => {
        try {
          let element = await driver.findElement(locator);
          let isDisplayed = await element.isDisplayed();
          let isEnabled = await element.isEnabled();
          
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
    
    // Wait for form elements
    await waitForInteractable(By.id('loginEmail'));
    await waitForInteractable(By.id('loginPassword'));
    await waitForInteractable(By.css('button[type="submit"]'));
    
    console.log('Form elements ready for interaction');
    
    // Get elements
    let emailInput = await driver.findElement(By.id('loginEmail'));
    let passwordInput = await driver.findElement(By.id('loginPassword'));
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));
    
    // Test with super admin credentials
    console.log('Testing login with super admin credentials...');
    
    await driver.actions().move({ origin: emailInput }).click().perform();
    await emailInput.clear();
    await emailInput.sendKeys('super.admin@email.com');
    
    await driver.actions().move({ origin: passwordInput }).click().perform();
    await passwordInput.clear();
    await passwordInput.sendKeys('123456');
    
    await driver.actions().move({ origin: submitButton }).click().perform();
    
    // Wait for submission to process
    await driver.sleep(3000);
    
    // Check result
    try {
      let errorAlert = await driver.findElement(By.css('.alert-danger'));
      let errorText = await errorAlert.getText();
      console.log('❌ Login failed:', errorText);
    } catch (e) {
      // Check if URL changed (successful login redirect)
      let currentUrl = await driver.getCurrentUrl();
      console.log('Current URL:', currentUrl);
      
      if (!currentUrl.includes('/login')) {
        console.log('✅ Login successful - redirected to:', currentUrl);
      } else {
        console.log('⚠️ Still on login page - checking for other indicators');
      }
    }
    
  } catch (err) {
    console.error('❌ Test failed:', err.message);
    
    // Take screenshot for debugging
    let screenshot = await driver.takeScreenshot();
    require('fs').writeFileSync('login-test-error.png', screenshot, 'base64');
    console.log('Screenshot saved: login-test-error.png');
    
  } finally {
    await driver.quit();
  }
})();
