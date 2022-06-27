const {Eyes, VisualGridRunner, Target} = require("@applitools/eyes-webdriverio")
const {remote} = require('webdriverio');

async function setupDriver() {
    // Use Chrome browser
    const chrome = {
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['headless']
            }
        },
        logLevel: 'silent',
        host: '127.0.0.1'
    };
    return await remote(chrome);
}

async function teardownDriver(driver) {
    await driver.deleteSession();
}

async function open(driver, url) {
    await driver.url(url)
}

const batch = {
    name: process.env.APPLITOOLS_BATCH_NAME || 'JS Support Matrix Eyes WebdriverIO 5',
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