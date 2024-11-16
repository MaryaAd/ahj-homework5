import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("Popover functionality", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:8080"; // adjust to your actual server URL

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    
    await new Promise((resolve, reject) => {
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        } else {
          reject(new Error('Server failed to start'));
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: true, // set to false if you need GUI
      // slowMo: 50, // add delay to better observe tests
      // devtools: false, // set to true if you need devTools
      // defaultViewport: {
      //   width: 1000,
      //   height: 1000,
      // },
    });

    page = await browser.newPage();
  });

  test("should display the popover when the button is clicked", async () => {
    await page.goto(baseUrl);
    const btn = await page.$(".btn-pop");
    await btn.click();
    const pop = await page.waitForSelector(".pop-content", { visible: true });
    expect(pop).toBeTruthy();
  });

  test("should remove the popover when the button is clicked again", async () => {
    await page.goto(baseUrl);
    const btn = await page.$(".btn-pop");
    await btn.click();
    await btn.click();
    const pop = await page.$(".pop-content");
    expect(pop).toBeNull();
  });

  test("should display the correct popover text", async () => {
    await page.goto(baseUrl);
    const btn = await page.$(".btn-pop");
    await btn.click();
    const popText = await page.$eval(".pop-text", (elem) => elem.textContent);
    expect(popText).toBe("And here's some amazing content. It's very engaging. Right?");
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.kill();
    }
  });

});
