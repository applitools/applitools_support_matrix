const {setupEyes, setupDriver, Target} = require(`../../${process.env.JS_TESTS_CONFIG_NAME}`)

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
            await driver.quit()
        }

    })

    it('window', async () => {
        await driver.get("https://applitools.github.io/demo/TestPages/FramesTestPage/")
        await eyes.open(driver, "Eyes Selenium SDK - Classic API", "CheckWindowDefaultFully", {
            width: 700,
            height: 460
        },)
        await eyes.check(Target.window().fully(true))
        await eyes.close()
    })


    it('region', async () => {
        await driver.get("https://applitools.github.io/demo/TestPages/FramesTestPage/")
        await eyes.open(driver, "Eyes Selenium SDK - Fluent API", "TestCheckRegionByCoordinates_Fluent", {
            width: 700,
            height: 460
        },)
        await eyes.check({region: {x: 50, y: 70, width: 90, height: 110}})
        await eyes.close()
    })

    it('frame', async () => {
        await driver.get("https://applitools.github.io/demo/TestPages/FramesTestPage/")
        eyes.setBranchName("universal-sdk")
        await eyes.open(driver, "Eyes Selenium SDK - Fluent API", "TestCheckFrame_Fluent", {width: 700, height: 460},)
        await eyes.check({frames: ["[name=\"frame1\"]"]})
        await eyes.close()
    })
})