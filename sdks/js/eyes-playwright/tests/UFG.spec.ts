import { test } from '@playwright/test';
import { Eyes, Target } from '@applitools/eyes-playwright';
import {setupEyes} from '../index'
test.describe('Support Matrix UFG', () => {
    let eyes: Eyes;
    test.beforeEach(async () => {
        eyes = setupEyes(
            {
                vg: true,
            })
    })

    test.afterEach(async () => {
        await eyes.abort()

    })

    test('window', async ({page}) => {
        await page.goto( "https://applitools.github.io/demo/TestPages/FramesTestPage/")
        await eyes.open(
            page,
            "Eyes Selenium SDK - Classic API",
            "CheckWindowDefaultFully_VG",
            {width: 700, height: 460},
        )
        await eyes.check('',Target.window().fully(true))
        await eyes.close(undefined)
    })


    test('region', async ({page}) => {
        await page.goto( "https://applitools.github.io/demo/TestPages/FramesTestPage/")
        await eyes.open(
            page,
            "Eyes Selenium SDK - Fluent API",
            "TestCheckRegionByCoordinates_Fluent_VG",
            {width: 700, height: 460},
        )
        await eyes.check({region: {x: 50, y: 70, width: 90, height: 110}})
        await eyes.close()
    })

    test('frame', async ({page}) => {
        await page.goto( "https://applitools.github.io/demo/TestPages/FramesTestPage/")
        eyes.setBranchName("universal-sdk")
        await eyes.open(
            page,
            "Eyes Selenium SDK - Classic API",
            "TestCheckFrame_VG",
            {width: 700, height: 460},
        )
        await eyes.check({frames: ["[name=\"frame1\"]"]})
        await eyes.close()
    })
})

