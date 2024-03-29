const {Eyes, VisualGridRunner, Target} = require("@applitools/eyes.webdriverio")

const batch = {
    name: process.env.APPLITOOLS_BATCH_NAME || 'JS Support Matrix Eyes WebdriverIO',
}

function setupEyes({vg, ...config}) {
    const runner = (vg ? new VisualGridRunner({testConcurrency: 500}) : undefined)
    const configuration = {
        apiKey: process.env.APPLITOOLS_API_KEY,
        batch,
        parentBranchName: 'wdio4',
        branchName: 'wdio4',
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
    Target,
}