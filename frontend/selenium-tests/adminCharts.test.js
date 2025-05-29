const { Builder, By, until } = require('selenium-webdriver');

(async function adminPageTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navigate to admin page
    console.log('Opening admin page...');
    await driver.get('http://localhost:3000/admin/page');
    
    // Wait for page to load
    await driver.wait(until.elementLocated(By.css('h2')), 15000);
    console.log('✓ Admin page loaded');

    // Check page title
    let pageTitle = await driver.findElement(By.css('h2')).getText();
    console.log('Page title:', pageTitle);

    // Wait for all charts to render
    console.log('Waiting for charts to load...');
    await driver.wait(until.elementsLocated(By.css('canvas')), 20000);
    
    let charts = await driver.findElements(By.css('canvas'));
    console.log(`Found ${charts.length} charts`);

    if (charts.length !== 3) {
      throw new Error(`Expected 3 charts, found ${charts.length}`);
    }

    // Check each chart has data
    let chartData = await driver.executeScript(`
      const canvases = document.querySelectorAll('canvas');
      const results = [];
      
      canvases.forEach((canvas, index) => {
        if (canvas.chart) {
          const chart = canvas.chart;
          const hasData = chart.data.datasets.length > 0 && 
                         chart.data.datasets[0].data.length > 0;
          
          results.push({
            index: index + 1,
            type: chart.config.type,
            hasData: hasData,
            dataCount: chart.data.datasets[0] ? chart.data.datasets[0].data.length : 0,
            labels: chart.data.labels || []
          });
        } else {
          results.push({
            index: index + 1,
            type: 'unknown',
            hasData: false,
            dataCount: 0,
            labels: []
          });
        }
      });
      
      return results;
    `);

    // Report results
    const chartNames = ['RadarChart', 'PieChart', 'DoughnutChart'];
    
    chartData.forEach((chart, i) => {
      console.log(`\n${chartNames[i]}:`);
      console.log(`  - Type: ${chart.type}`);
      console.log(`  - Has Data: ${chart.hasData}`);
      console.log(`  - Data Points: ${chart.dataCount}`);
      console.log(`  - Labels: ${chart.labels.slice(0, 3)}...`); // Show first 3 labels
      
      if (chart.hasData) {
        console.log(`  ✓ ${chartNames[i]} loaded successfully`);
      } else {
        console.log(`  ✗ ${chartNames[i]} has no data`);
      }
    });

    // Summary
    let chartsWithData = chartData.filter(chart => chart.hasData).length;
    console.log(`\nSummary: ${chartsWithData}/3 charts have data`);
    
    if (chartsWithData === 3) {
      console.log('✓ All charts loaded successfully!');
    } else {
      console.log('⚠ Some charts are missing data');
    }

  } catch (err) {
    console.error('Test failed:', err);
    
    // Simple debug info
    try {
      let canvases = await driver.findElements(By.css('canvas'));
      console.log('Debug: Found', canvases.length, 'canvas elements');
      
      let h4Elements = await driver.findElements(By.css('h4'));
      console.log('Debug: Found', h4Elements.length, 'chart titles');
      
    } catch (debugErr) {
      console.error('Debug failed:', debugErr);
    }
    
  } finally {
    await driver.quit();
  }
})();
