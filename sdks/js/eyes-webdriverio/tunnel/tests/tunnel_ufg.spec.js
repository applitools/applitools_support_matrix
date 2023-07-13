const {Eyes, Target, VisualGridRunner} = require("@applitools/eyes-webdriverio")
const {remote} = require('webdriverio');

const batch = {
    name: 'JS EC tunnel check'
}


describe('Support Matrix CSS', () => {
    let driver, eyes

    beforeEach(async () => {
        eyes = new Eyes(new VisualGridRunner())
        const conf = eyes.getConfiguration();
        conf.setApiKey(process.env.APPLITOOLS_API_KEY)
        conf.setServerUrl(process.env.APPLITOOLS_SERVER_URL)
        conf.setBatch(batch);
        conf.setParentBranchName("master")
        conf.setBranchName("master")
        conf.setDontCloseBatches(true)
        conf.matchTimeout = 0;
        conf.setSaveNewTests(false)
        conf.setStitchMode("CSS")
        conf.addBrowser({name: "chrome", height: 1080, width: 1920})
        conf.addBrowser({name: "edge", height: 1080, width: 1920})
        eyes.setConfiguration(conf)
        // parse EC proxy url to get only it's port
        const port = parseInt(process.env.EC_CLOUD_PORT, 10)
        const chrome = {
            capabilities: {
                browserName: 'chrome',
                "applitools:tunnel": true

            },
            logLevel: 'silent',
            port
        };
        driver = await remote(chrome);
    })

    afterEach(async () => {
        await eyes.getRunner().getAllTestResults()
        try {
            await eyes.abort()
        } finally {
            await driver.deleteSession();
        }

    })

    it('Simple check', async () => {
        await driver.url("http://localhost:3000")
        await eyes.open(driver, "Support Matrix EC tunnel", "Tunnel check", {
            width: 700,
            height: 460
        },)
        await eyes.check(Target.window().fully(true))
        await eyes.check(Target.region("#region"))
        await eyes.close()
    })


})