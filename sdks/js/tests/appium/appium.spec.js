const {setupEyes, setupDriver, teardownDriver, open, Target} = require(`../../${process.env.JS_TESTS_CONFIG_NAME}`)

describe('Support Matrix Appium', () => {
    let driver, eyes

    afterEach(async () => {

        try {
            await eyes.abort()
        } finally {
            await teardownDriver(driver)
        }

    })

    describe('Classic', async () => {

        beforeEach(async () => {
            driver = await setupDriver(true);
            eyes = setupEyes({
                stitchMode: "CSS",
            })
        })

        it('ios', async () => {
            await eyes.open(driver, "Applitools Support Matrix", "Appium iOS window - Classic")
            await eyes.check(Target.window())
            await eyes.close()
        })
    })

    describe('UFG', async () => {

        beforeEach(async () => {
            driver = await setupDriver(true, true);
            eyes = setupEyes(
                {
                    vg: true,
                    appium: true,
                })
        })

        it('ios', async () => {
            await eyes.open(driver, "Applitools Support Matrix", "Appium iOS window - UFG")
            await eyes.check(Target.window())
            await eyes.close()
        })
    })
})