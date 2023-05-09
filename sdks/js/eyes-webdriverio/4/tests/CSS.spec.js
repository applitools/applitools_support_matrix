const {setupEyes, Target} = require("../index")
const webdriverio = require('webdriverio');

describe('Support Matrix CSS', () => {
    let driver, eyes
    beforeEach(async () => {
        const chrome = {
            desiredCapabilities: {
                browserName: 'chrome',
                'goog:chromeOptions': {
                    args: ['headless']
                }
            },
            host: process.env.SELENIUM_SERVER_HOST || '127.0.0.1'

        };
        driver = webdriverio.remote(chrome);
        await driver.init()
        eyes = setupEyes({
            stitchMode: "CSS",
        })
    })

    afterEach(async () => {

        try {
            await eyes.abort()
        } finally {
            await driver.end()
        }

    })

    it('window', async () => {
        await driver.url("https://applitools.github.io/demo/TestPages/FramesTestPage/")
        await eyes.open(driver, "Applitools Support Matrix", "Window - Classic", {
            width: 700,
            height: 460
        },)
        await eyes.check(Target.window().fully(true))
        await eyes.close()
    })


    it('region', async () => {
        await driver.url("https://applitools.github.io/demo/TestPages/FramesTestPage/")
        await eyes.open(driver, "Applitools Support Matrix", "Region - Classic", {
            width: 700,
            height: 460
        },)
        await eyes.check({region: {x: 50, y: 70, width: 90, height: 110}})
        await eyes.close()
    })

    it('frame', async () => {
        await driver.url("https://applitools.github.io/demo/TestPages/FramesTestPage/")
        await eyes.open(driver, "Applitools Support Matrix", "Frame - Classic", {width: 700, height: 460},)
        await eyes.check({frames: ["[name=\"frame1\"]"]})
        await eyes.close()
    })
})