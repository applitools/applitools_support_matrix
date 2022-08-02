const {setupEyes, setupDriver, teardownDriver, open, Target} = require(`../../${process.env.JS_TESTS_CONFIG_NAME}`)

describe('Support Matrix CSS', () => {
    let driver, eyes

    beforeEach(async () => {
        driver = await setupDriver();
        eyes = setupEyes({
            stitchMode: "CSS",
        })
    })

    afterEach(async () => {

        try {
            await eyes.abort()
        } finally {
            await teardownDriver(driver)
        }

    })

    it('window', async () => {
        await open(driver, "https://applitools.github.io/demo/TestPages/FramesTestPage/")
        await eyes.open(driver, "Applitools Support Matrix", "Window - Classic", {
            width: 700,
            height: 460
        },)
        await eyes.check(Target.window().fully(true))
        await eyes.close()
    })


    it('region', async () => {
        await open(driver, "https://applitools.github.io/demo/TestPages/FramesTestPage/")
        await eyes.open(driver, "Applitools Support Matrix", "Region - Classic", {
            width: 700,
            height: 460
        },)
        await eyes.check({region: {x: 50, y: 70, width: 90, height: 110}})
        await eyes.close()
    })

    it('frame', async () => {
        await open(driver, "https://applitools.github.io/demo/TestPages/FramesTestPage/")
        await eyes.open(driver, "Applitools Support Matrix", "Frame - Classic", {width: 700, height: 460},)
        await eyes.check({frames: ["[name=\"frame1\"]"]})
        await eyes.close()
    })
})