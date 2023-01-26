const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

export const handler = async () => {

    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: true,
    })

    const page = await browser.newPage();

    try {
        await page.goto('http://lms.uaf.edu.pk/login/index.php');
    } catch (error) {
        return {
            statusCode: 505,
            body: JSON.stringify({
                message: "error in visiting lms"
            })
        }
    }
    

    await browser.close();


    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello World!',
      }),
    }
}