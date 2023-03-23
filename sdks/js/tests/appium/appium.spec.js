const {setupEyes, setupDriver, teardownDriver, Target} = require(`../../${process.env.JS_TESTS_CONFIG_NAME}`)

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
            eyes = setupEyes({
                stitchMode: "CSS",
            })
        })

        it('ios', async () => {
            driver = await setupDriver({appium: true, platform: 'iOS'});
            await eyes.open(driver, "Applitools Support Matrix", "Appium iOS window - Classic")
            await eyes.check(Target.window())
            await eyes.close()
        })

        it('android', async () => {
            driver = await setupDriver({appium: true, platform: 'Android'});
            await eyes.open(driver, "Applitools Support Matrix", "Appium Android window - Classic")
            await eyes.check(Target.window())
            await eyes.close()
        })
    })

    describe('UFG', async () => {


        it('ios', async () => {
            driver = await setupDriver({appium: true, ufg: true, platform: 'iOS'});
            eyes = setupEyes({vg: true, appium: true, platform: 'iOS'})
            await eyes.open(driver, "Applitools Support Matrix", "Appium iOS window - UFG")
            await eyes.check(Target.window())
            await eyes.close()
        })

        it('android', async () => {
            driver = await setupDriver({appium: true, ufg: true, platform: 'Android'});
            eyes = setupEyes({vg: true, appium: true, platform: 'Android'})
            await eyes.open(driver, "Applitools Support Matrix", "Appium Android window - UFG")
            await eyes.check(Target.window())
            await eyes.close()
        })
    })
})