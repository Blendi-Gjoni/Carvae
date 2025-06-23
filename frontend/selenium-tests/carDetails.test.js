// File: selenium-tests/CarDetails.test.js
const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function CarDetails() {
  // Define a test car matching the component’s expected shape
  const testCar = {
    id: 1,
    modelName: 'Test Model',
    year: 2022,
    categoryName: 'Sedan',
    description: 'This is a test description for the sedan model.',
    carType: 'DEALERSHIP',      // exercise the “Calculate Total Price” path
    horsepower: 200,
    kilometers: 15000,
    exterior: 'Red',
    interior: 'Black',
    fuelType: 'Petrol',
    transmission: 'Manual',
    price: 30000,
  };

  const driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log('→ Loading app root to set history state…');
    // 1) Load your app’s origin so replaceState works
    await driver.get('http://localhost:3000/');
    await driver.sleep(500);

    console.log('→ Injecting testCar into history.state and navigating…');
    await driver.executeScript(`
      window.history.replaceState(
        { car: ${JSON.stringify(testCar)} },
        '',
        '/car-details'
      );
      window.location.href = '/car-details';
    `);
    await driver.sleep(1500);

    // 2) Wait for main heading
    await driver.wait(until.elementLocated(By.css('h1')), 10000);
    console.log('✓ Found <h1>:', await driver.findElement(By.css('h1')).getText());
    await driver.sleep(500);

    // 3) Subtitle: year + category
    const subtitle = await driver.findElement(By.css('h5.text-light')).getText();
    console.log('✓ Subtitle:', subtitle);
    await driver.sleep(500);

    // 4) Description
    const desc = await driver.findElement(By.css('p.lead')).getText();
    console.log('✓ Description:', desc);
    await driver.sleep(500);

    // 5) Horsepower card
    const hp = await driver.findElement(
      By.xpath("//div[.//text()[normalize-space()='Power']]//h5")
    ).getText();
    console.log('✓ Horsepower:', hp);
    await driver.sleep(500);

    // 6) Mileage card
    const km = await driver.findElement(
      By.xpath("//div[.//text()[normalize-space()='Mileage']]//h5")
    ).getText();
    console.log('✓ Mileage:', km);
    await driver.sleep(500);

    // 7) Exterior & Interior
    const ext = await driver.findElement(
      By.xpath("//div[.//text()[normalize-space()='Exterior Color']]//h5")
    ).getText();
    console.log('✓ Exterior Color:', ext);
    await driver.sleep(500);

    const intl = await driver.findElement(
      By.xpath("//div[.//text()[normalize-space()='Interior Color']]//h5")
    ).getText();
    console.log('✓ Interior Color:', intl);
    await driver.sleep(500);

    // 8) Fuel & Transmission
    const fuel = await driver.findElement(
      By.xpath("//div[.//text()[normalize-space()='Fuel']]//h5")
    ).getText();
    console.log('✓ Fuel Type:', fuel);
    await driver.sleep(500);

    const trans = await driver.findElement(
      By.xpath("//div[.//text()[normalize-space()='Transmission']]//h5")
    ).getText();
    console.log('✓ Transmission:', trans);
    await driver.sleep(500);

    // 9) Base price line
    const priceLine = await driver.findElement(
      By.xpath("//*[contains(text(),'Car price:')]")
    ).getText();
    console.log('✓', priceLine);
    await driver.sleep(500);

    console.log('✓ CarDetails test completed successfully!');
  } catch (err) {
    console.error('❌ CarDetails test failed:', err);

    // Save debug artifacts
    const shot = await driver.takeScreenshot();
    fs.writeFileSync('cardetails-debug.png', shot, 'base64');
    console.log('Saved screenshot: cardetails-debug.png');

    const html = await driver.getPageSource();
    fs.writeFileSync('cardetails-debug.html', html);
    console.log('Saved HTML snapshot: cardetails-debug.html');
  } finally {
    await driver.quit();
  }
})();
