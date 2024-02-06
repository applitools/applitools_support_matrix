const {Eyes, VisualGridRunner, Target} = require("@applitools/eyes-puppeteer")
const puppeteer = require('puppeteer')

async function setupDriver() {
    // Use Chrome browser
    browser = await puppeteer.launch({
        // change to new headless later on
        headless: 'shell',
        args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
    })
    page = await browser.newPage();
    return page;
}

async function teardownDriver(page) {
    await page.browser().close();
}

async function open(page, url) {
    await page.goto(url)
}

const batch = {
    name: process.env.APPLITOOLS_BATCH_NAME || 'JS Support Matrix Eyes Puppeteer',
}

function setupEyes({vg, ...config}) {
    const runner = (vg ? new VisualGridRunner({testConcurrency: 500}) : undefined)
    const configuration = {
        apiKey: process.env.APPLITOOLS_API_KEY,
        batch,
        parentBranchName: 'puppeteer',
        branchName: 'puppeteer',
        dontCloseBatches: true,
        matchTimeout: 0,
        saveNewTests: false,
        hideScrollbars: false,
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
