const {Eyes, VisualGridRunner, Target} = require("@applitools/eyes.webdriverio")
const webdriverio = require('webdriverio');

async function setupDriver() {
    // Use Chrome browser
    const chrome = {
        desiredCapabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['headless']
            }
        },
        host: '127.0.0.1'
    };

    // Use Chrome browser
    const driver = webdriverio.remote(chrome);
    return driver.init();
}

async function teardownDriver(driver) {
    await driver.end();
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
    Target,
}