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
    console.log(error);
    return {
      statusCode: 505,
      body: JSON.stringify({
        message: 'something bad in browser instance',
      }),
    }
  }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello",
      }),
    }
}