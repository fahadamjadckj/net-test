const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

export const handler = async () => {

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: true,
  });

  await browser.close();
 
    
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello",
    }),
  }
}