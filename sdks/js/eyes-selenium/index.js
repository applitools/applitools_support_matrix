const {
    Eyes,
    VisualGridRunner,
    Target,
    ConsoleLogHandler,
    IosDeviceName,
    ScreenOrientation,
    IosVersion
} = require("@applitools/eyes-selenium")
const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const SAUCE_URL = "https://ondemand.us-west-1.saucelabs.com:443/wd/hub"

async function setupDriver(appium = false, ufg = false) {
    if (appium) {
        let caps = {
            browserName: '',
            platformName: 'iOS',
            "appium:platformVersion": '16.0',
            "appium:newCommandTimeout": 600,
            "appium:app": 'storage:filename=awesomeswift.app.zip',
            "appium:deviceName": 'iPhone 8 Simulator',
            "appium:automationName": 'XCUITest',
            'sauce:options': {
                username: process.env.SAUCE_USERNAME,
                accessKey: process.env.SAUCE_ACCESS_KEY,
                name: 'Support Matrix'
            }

        }
        if (ufg) {
            caps["appium:processArguments"] = {
                args: [],
                env: {
                    DYLD_INSERT_LIBRARIES: "@executable_path/Frameworks/UFG_lib.xcframework/ios-arm64_x86_64-simulator/UFG_lib.framework/UFG_lib",
                    NML_API_KEY: process.env.APPLITOOLS_API_KEY
                }
            }
        }
        const builder = new Builder().withCapabilities(caps).usingServer(SAUCE_URL)
        return builder.build();
    } else {
        // Use Chrome browser
        const options = new chrome.Options();
        options.headless();
        options.addArguments("--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage")

        const builder = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
        builder.usingServer("http://localhost:4444/wd/hub")
        return builder.build();
    }
}

async function teardownDriver(driver) {
    await driver.quit();
}

async function open(driver, url) {
    await driver.get(url)
}

const batch = {
    name: process.env.APPLITOOLS_BATCH_NAME || 'JS Support Matrix Eyes Selenium',
}

function setupEyes({appium, vg, ...config}) {
    const runner = (vg ? new VisualGridRunner({testConcurrency: 500}) : undefined)
    const configuration = {
        apiKey: process.env.APPLITOOLS_API_KEY,
        batch,
        parentBranchName: 'master',
        branchName: 'master',
        dontCloseBatches: true,
        matchTimeout: 0,
        saveNewTests: false,
        ...config,
    }
    const eyes = new Eyes(runner)
    eyes.setConfiguration(configuration)
    eyes.setLogHandler(new ConsoleLogHandler(true))
    if (appium && vg) {
        const ufg = eyes.getConfiguration();
        ufg.addBrowser({
            iosDeviceInfo: {
                deviceName: IosDeviceName.iPhone_8,
                screenOrientation: ScreenOrientation.PORTRAIT,
                iosVersion: IosVersion.LATEST
            }
        })
        eyes.setConfiguration(ufg);
    }
    return eyes
}

module.exports = {
    setupEyes,
    setupDriver,
    teardownDriver,
    open,
    Target,
}