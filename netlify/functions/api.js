const playwright = require('playwright');

export const handler = async () => {

  let browser = null;

  try {
    browser = await playwright.chromium.launch({
      headless: true,
      proxy: {
        server: '119.160.107.86:3128'
      },
    });
  } catch (error) {
    return {
      statusCode: 505,
      body: JSON.stringify({
        message: error,
      }),
    }
  }

  const page = await browser.newPage();
  await page.goto('http://lms.uaf.edu.pk/login/index.php');

  const title = await page.title();

  await page.evaluate(() => {
    const input = document.querySelector('#REG');
    input.focus();
    input.value = '2020-ag-8322';

    const button = document.querySelector('input[value=Result]');
    button.click();
  })

  await page.waitForNavigation();

  let data = await page.evaluate(() => {
    let values = [];
    let tableRows = document.querySelectorAll("tr");

    tableRows.forEach((row) => {
      let children = {};
      let index = 0;
      row.childNodes.forEach((child) => {
        if (child.innerText != null) {
          children[index] = child.innerText;
          index++;
        }
      });
      values.push(children);
    });

    return values;
  });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: data,
      }),
    }
}