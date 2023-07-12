const {Eyes, Target} = require("@applitools/eyes-selenium")
const {Builder} = require('selenium-webdriver');

const batch = {
    name: 'JS EC tunnel check'
}


describe('Support Matrix CSS', () => {
    let driver, eyes

    beforeEach(async () => {
        eyes = new Eyes()
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
        eyes.setConfiguration(conf)
        const url = await eyes.getExecutionCloudUrl();
        const capabilities = {
                browserName: 'chrome',
                "applitools:tunnel": true

            };
        driver = await new Builder().withCapabilities(capabilities).usingServer(url).build();
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