// File: selenium-tests/UsersDashboardCRUD.test.js
const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function UsersDashboardCRUD() {
  let driver = await new Builder().forBrowser('chrome').build();

  async function waitForInteractable(locator, timeout = 15000) {
    return driver.wait(async () => {
      try {
        const el = await driver.findElement(locator);
        const displayed = await el.isDisplayed();
        const enabled   = await el.isEnabled();
        const clickable = await driver.executeScript(
          `const e = arguments[0];
           const r = e.getBoundingClientRect();
           const cx = r.left + r.width/2, cy = r.top + r.height/2;
           const top = document.elementFromPoint(cx, cy);
           return e === top || e.contains(top);`,
          el
        );
        return displayed && enabled && clickable;
      } catch {
        return false;
      }
    }, timeout);
  }

  try {
    // 1) Navigate
    console.log('→ Navigating to Users Dashboard…');
    await driver.get('http://localhost:3000/admin/users');
    await driver.sleep(1500);

    await driver.wait(until.elementLocated(By.css('table.table')), 10000);
    console.log('✓ Table is present');
    await driver.sleep(1500);

    // 2) READ (initial count)
    let rows = await driver.findElements(By.css('table tbody tr'));
    const initialCount = rows.length;
    console.log('Initial user count:', initialCount);
    await driver.sleep(1500);

    // 3) CREATE
    console.log('→ Testing CREATE…');
    await waitForInteractable(By.id('addUserBtn'));
    await driver.sleep(500);
    await driver.findElement(By.id('addUserBtn')).click();
    console.log('Clicked Add User');
    await driver.sleep(1500);

    await waitForInteractable(By.id('userFormUsername'));
    console.log('Filling in form...');
    await driver.findElement(By.id('userFormUsername')).clear();
    await driver.findElement(By.id('userFormUsername')).sendKeys('temp_user');
    await driver.sleep(500);
    await driver.findElement(By.id('userFormEmail')).clear();
    await driver.findElement(By.id('userFormEmail')).sendKeys('temp@example.com');
    await driver.sleep(500);
    await driver.findElement(By.id('userFormRole')).sendKeys('User');
    await driver.sleep(500);

    await waitForInteractable(By.id('userFormSubmit'));
    await driver.findElement(By.id('userFormSubmit')).click();
    console.log('Submitted Create form');
    await driver.sleep(1500);

    await driver.wait(async () => {
      const r = await driver.findElements(By.css('table tbody tr'));
      return r.length === initialCount + 1;
    }, 10000);
    console.log('✓ CREATE passed');
    await driver.sleep(1500);

    // 4) UPDATE
    console.log('→ Testing UPDATE…');
    rows = await driver.findElements(By.css('table tbody tr'));
    let targetRow = null;
    for (const r of rows) {
      if ((await r.getText()).includes('temp_user')) {
        targetRow = r;
        break;
      }
    }
    if (!targetRow) throw new Error('Could not find newly created row');
    await driver.sleep(500);

    await targetRow.findElement(By.css('.btn-edit')).click();
    console.log('Clicked Edit');
    await driver.sleep(1500);

    await waitForInteractable(By.id('userFormUsername'));
    const usernameInput = await driver.findElement(By.id('userFormUsername'));
    await usernameInput.clear();
    await usernameInput.sendKeys('updated_user');
    await driver.sleep(500);

    await driver.findElement(By.id('userFormSubmit')).click();
    console.log('Submitted Update form');
    await driver.sleep(1500);

    await driver.wait(async () => (await targetRow.getText()).includes('updated_user'), 10000);
    console.log('✓ UPDATE passed');
    await driver.sleep(1500);

    // 5) DELETE
    console.log('→ Testing DELETE…');
    await targetRow.findElement(By.css('.btn-delete')).click();
    console.log('Clicked Delete');
    await driver.sleep(1500);

    await driver.wait(async () => {
      const texts = await Promise.all(
        (await driver.findElements(By.css('table tbody tr'))).map(r => r.getText())
      );
      return !texts.some(t => t.includes('updated_user'));
    }, 10000);
    console.log('✓ DELETE passed');
    await driver.sleep(1500);

    // 6) VERIFY final count
    const finalCount = (await driver.findElements(By.css('table tbody tr'))).length;
    console.log('Final user count:', finalCount);
    if (finalCount === initialCount) {
      console.log('✔️ CRUD test suite passed');
    } else {
      console.error('❌ Mismatch in row count after delete');
    }

  } catch (err) {
    console.error('❌ CRUD test failed:', err);

    const url = await driver.getCurrentUrl();
    console.log('Current URL:', url);

    const shot = await driver.takeScreenshot();
    fs.writeFileSync('users-crud-debug.png', shot, 'base64');
    console.log('Saved screenshot: users-crud-debug.png');

    const html = await driver.getPageSource();
    fs.writeFileSync('users-crud-debug.html', html);
    console.log('Saved HTML snapshot: users-crud-debug.html');
  } finally {
    await driver.quit();
  }
})();
