const { Builder, By, until } = require('selenium-webdriver');

(async function verificationCodeTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Open the register page
    await driver.get('http://localhost:3000/register');
    
    // Enable test mode
    await driver.executeScript('window.testMode = true;');
    
    // Refresh to apply test mode and show the test button
    await driver.navigate().refresh();
    
    // Wait for React to load and render the form
    console.log('Waiting for React app to load...');
    await driver.wait(until.elementLocated(By.id('registerUsername')), 15000);
    console.log('Register form loaded successfully!');

    // Wait for test button to appear
    console.log('Waiting for test modal button...');
    await driver.wait(until.elementLocated(By.id('test-show-modal')), 10000);
    console.log('Test modal button found!');

    // Click test button to show modal
    console.log('Clicking test modal button to show verification modal...');
    await driver.findElement(By.id('test-show-modal')).click();

    // --- Step 1: Wait for modal to appear ---
    console.log('Step 1: Waiting for verification modal to appear...');
    
    // Wait specifically for verification code input and submit button
    await driver.wait(until.elementLocated(By.id('verificationCode')), 10000);
    await driver.wait(until.elementLocated(By.id('submit-vc-button')), 10000);
    console.log('Verification modal elements found!');

    // --- Test 1: Submit empty verification code ---
    console.log('Test 1: Testing empty verification code...');
    
    await driver.findElement(By.id('submit-vc-button')).click();
    
    // Wait for validation error
    await driver.wait(until.elementLocated(By.id('verificationCode-error')), 5000);
    
    let verificationError = await driver.findElement(By.id('verificationCode-error')).getText();
    console.log('Verification code error (empty):', verificationError);

    // --- Test 2: Submit invalid verification code (wrong length) ---
    console.log('Test 2: Testing invalid verification code length...');
    
    let verificationInput = await driver.findElement(By.id('verificationCode'));
    await verificationInput.clear();
    await verificationInput.sendKeys('12345'); // 5 digits instead of 6
    
    await driver.findElement(By.id('submit-vc-button')).click();
    
    // Wait for validation error to update
    await driver.sleep(1000);
    
    verificationError = await driver.findElement(By.id('verificationCode-error')).getText();
    console.log('Verification code error (wrong length):', verificationError);

    // --- Test 3: Submit valid length verification code ---
    console.log('Test 3: Testing valid length verification code...');
    
    await verificationInput.clear();
    await verificationInput.sendKeys('123456'); // 6 digits
    
    await driver.findElement(By.id('submit-vc-button')).click();
    
    // Wait to see what happens (this might show verification failed message since it's not a real code)
    await driver.sleep(3000);
    
    // Check for verification message
    try {
      let verificationMessage = await driver.findElement(By.css('.text-info p')).getText();
      console.log('Verification message:', verificationMessage);
    } catch (e) {
      console.log('No verification message found (might be successful or still processing)');
    }

    // --- Test 4: Test different invalid lengths ---
    console.log('Test 4: Testing various invalid lengths...');
    
    // Test too short (1 digit)
    await verificationInput.clear();
    await verificationInput.sendKeys('1');
    await driver.findElement(By.id('submit-vc-button')).click();
    await driver.sleep(1000);
    
    verificationError = await driver.findElement(By.id('verificationCode-error')).getText();
    console.log('Verification code error (1 digit):', verificationError);
    
    // Test too long (7 digits)
    await verificationInput.clear();
    await verificationInput.sendKeys('1234567');
    await driver.findElement(By.id('submit-vc-button')).click();
    await driver.sleep(1000);
    
    verificationError = await driver.findElement(By.id('verificationCode-error')).getText();
    console.log('Verification code error (7 digits):', verificationError);

    // --- Test 5: Test modal close functionality ---
    console.log('Test 5: Testing modal close functionality...');
    
    // Look for close button or backdrop (adjust based on your DefaultModal implementation)
    try {
      // Try common close button selectors
      const closeSelectors = [
        '.btn-close',
        '.close',
        '[data-bs-dismiss="modal"]',
        '.modal-header button',
        '.modal-header .btn-close'
      ];
      
      let closeButtonFound = false;
      for (let selector of closeSelectors) {
        try {
          let closeButton = await driver.findElement(By.css(selector));
          await closeButton.click();
          console.log(`Modal closed using selector: ${selector}`);
          closeButtonFound = true;
          break;
        } catch (e) {
          // Try next selector
        }
      }
      
      if (!closeButtonFound) {
        // Try clicking modal backdrop or pressing Escape
        console.log('Close button not found, trying Escape key...');
        await driver.actions().sendKeys(driver.Key.ESCAPE).perform();
      }
      
    } catch (e) {
      console.log('Could not close modal:', e.message);
    }

    // Wait to see if modal closes
    await driver.sleep(2000);
    
    // Verify modal is closed by checking if verification code input is no longer visible
    try {
      await driver.findElement(By.id('verificationCode'));
      console.log('Modal is still open');
    } catch (e) {
      console.log('Modal successfully closed');
    }

    // --- Test 6: Reopen modal and test clear functionality ---
    console.log('Test 6: Testing modal reopen and input clearing...');
    
    // Reopen modal using test button
    await driver.findElement(By.id('test-show-modal')).click();
    await driver.wait(until.elementLocated(By.id('verificationCode')), 5000);
    
    // Fill input and then clear it
    verificationInput = await driver.findElement(By.id('verificationCode'));
    await verificationInput.sendKeys('123456');
    
    let inputValue = await verificationInput.getAttribute('value');
    console.log('Input value after typing:', inputValue);
    
    await verificationInput.clear();
    inputValue = await verificationInput.getAttribute('value');
    console.log('Input value after clearing:', inputValue);

    console.log('Verification modal tests completed successfully!');

  } catch (err) {
    console.error('Test failed:', err);
    
    // Enhanced debug for modal testing
    try {
      console.log('\n=== MODAL DEBUG INFORMATION ===');
      
      // Check if test mode is enabled
      let testMode = await driver.executeScript('return window.testMode;');
      console.log('Test mode enabled:', testMode);
      
      // Check for test button
      try {
        await driver.findElement(By.id('test-show-modal'));
        console.log('Test modal button is present');
      } catch (e) {
        console.log('Test modal button is NOT present');
      }
      
      // Check for any modals on page
      let modals = await driver.findElements(By.css('.modal'));
      console.log('Number of modal elements found:', modals.length);
      
      // Check for modal-related classes
      let modalShows = await driver.findElements(By.css('.modal.show'));
      console.log('Number of visible modals (.modal.show):', modalShows.length);
      
      // Check page source for modal content
      let pageSource = await driver.getPageSource();
      console.log('Page contains "verificationCode":', pageSource.includes('verificationCode'));
      console.log('Page contains "Verify Your Email":', pageSource.includes('Verify Your Email'));
      console.log('Page contains "test-show-modal":', pageSource.includes('test-show-modal'));
      
      // Check for any error messages on page
      let errorElements = await driver.findElements(By.css('[id$="-error"]'));
      console.log('Number of error elements found:', errorElements.length);
      
    } catch (debugErr) {
      console.error('Debug failed:', debugErr);
    }
    
  } finally {
    await driver.quit();
  }
})();
