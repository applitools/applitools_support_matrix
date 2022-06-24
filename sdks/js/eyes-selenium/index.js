const {Eyes, VisualGridRunner, Target} = require("@applitools/eyes-selenium")
const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function setupDriver() {
    // Use Chrome browser
    const options = new chrome.Options();
    options.headless();

    const builder = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
    if (process.env.CI !== 'true') builder.usingServer("http://localhost:4444/wd/hub")
    return builder.build();
}

async function teardownDriver(driver) {
    await driver.quit();
}

async function open(driver, url) {
    await driver.get(url)
}

const batch = {
    name: process.env.APPLITOOLS_BATCH_NAME || 'JS Support Matrix Eyes Selenium',
}

function setupEyes({vg, ...config}) {
    const runner = (vg ? new VisualGridRunner({testConcurrency: 500}) : undefined)
    const configuration = {
        apiKey: process.env.APPLITOOLS_API_KEY,
        batch,
        parentBranchName: 'master',
        branchName: 'master',
        dontCloseBatches: true,
        matchTimeout: 0,
        saveNewTests: false,
        ...config,
    }
    const eyes = new Eyes(runner)
    eyes.setConfiguration(configuration)
    return eyes
}

module.exports = {
    setupEyes,
    setupDriver,
    teardownDriver,
    open,
    Target,
}