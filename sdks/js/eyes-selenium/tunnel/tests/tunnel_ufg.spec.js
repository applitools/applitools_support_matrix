const {Eyes, Target, VisualGridRunner} = require("@applitools/eyes-selenium")
const {Builder} = require('selenium-webdriver');

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
        const capabilities = {
                browserName: 'chrome',
                "applitools:tunnel": true

            };
        driver = await new Builder().withCapabilities(capabilities).usingServer(process.env.EC_CLOUD_URL).build();
    })

    afterEach(async () => {
        await eyes.getRunner().getAllTestResults()
        try {
            await eyes.abort()
        } finally {
            await driver.quit();
        }

    })

    it('Simple check', async () => {
        await driver.get("http://localhost:3000")
        await eyes.open(driver, "Support Matrix EC tunnel", "Tunnel check", {
            width: 700,
            height: 460
        },)
        await eyes.check(Target.window().fully(true))
        await eyes.check(Target.region("#region"))
        await eyes.close()
    })


})