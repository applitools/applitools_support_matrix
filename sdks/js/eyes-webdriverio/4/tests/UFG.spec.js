const {setupEyes, Target} = require(`../`)
const webdriverio = require("webdriverio");
describe('Support Matrix UFG', () => {
    let driver, eyes
    beforeEach(async () => {
        const chrome = {
            desiredCapabilities: {
                browserName: 'chrome',
                'goog:chromeOptions': {
                    args: ['headless','--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
                }
            },
            hostname: process.env.SELENIUM_SERVER_HOST || '127.0.0.1',
            path: '/wd/hub'
        };
        driver = webdriverio.remote(chrome);
        await driver.init()
        eyes = setupEyes(
            {
                vg: true,
            })
    })

    afterEach(async () => {

        try {
            await eyes.abort()
        } finally {
            await driver.end();
        }

    })

    it('window', async () => {
        await driver.url("https://applitools.github.io/demo/TestPages/FramesTestPage/")
        await eyes.open(
            driver,
            "Applitools Support Matrix",
            "Window - UFG",
            {width: 700, height: 460},
        )
        await eyes.check(Target.window().fully(true))
        await eyes.close(undefined)
    })


    it('region', async () => {
        await driver.url("https://applitools.github.io/demo/TestPages/FramesTestPage/")
        await eyes.open(
            driver,
            "Applitools Support Matrix",
            "Region - UFG",
            {width: 700, height: 460},
        )
        await eyes.check({region: {x: 50, y: 70, width: 90, height: 110}})
        await eyes.close()
    })
})