const {
    Eyes,
    VisualGridRunner,
    Target,
    ConsoleLogHandler,
    IosDeviceName,
    AndroidDeviceName,
    IosVersion,
    AndroidVersion,
    BatchInfo,
} = require("@applitools/eyes-selenium")
const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const SAUCE_URL = "https://ondemand.us-west-1.saucelabs.com:443/wd/hub"
const SELENIUM_SERVER_URL = process.env.SELENIUM_SERVER_URL || "http://localhost:4444/wd/hub"
const ORIENTATION = process.env.MATRIX_DEVICE_ORIENTATION || "PORTRAIT";

async function setupDriver(options) {
    let appium, ufg, platform;
    if (options) {
        ({appium, ufg, platform} = options)
    } else {
        appium = false
        ufg = false
    }
    if (appium) {
        let caps = platform==='iOS' ? getIOSCaps(ufg) : getAndroidCaps(ufg)
        const builder = new Builder().withCapabilities(caps).usingServer(SAUCE_URL)
        return builder.build();
    } else {
        // Use Chrome browser
        const options = new chrome.Options();
        options.addArguments("--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", "--headless")

        const builder = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
        builder.usingServer(SELENIUM_SERVER_URL)
        return builder.build();
    }
}

async function teardownDriver(driver) {
    await driver.quit();
}

async function open(driver, url) {
    await driver.get(url)
}

const batch = new BatchInfo(process.env.APPLITOOLS_BATCH_NAME || 'JS Support Matrix Eyes Selenium');

function setupEyes({appium, vg, platform, ...config}) {
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
        if (platform === 'iOS') {
            ufg.addBrowser({
                iosDeviceInfo: {
                    deviceName: IosDeviceName.iPhone_8,
                    screenOrientation: ORIENTATION.toLowerCase(),
                    iosVersion: IosVersion.LATEST
                }
            })
        }
        if (platform === 'Android') {
            ufg.addBrowser({
                androidDeviceInfo: {
                    deviceName: AndroidDeviceName.Pixel_5,
                    screenOrientation: ORIENTATION.toLowerCase(),
                    androidVersion: AndroidVersion.LATEST
                }
            })
        }
        eyes.setConfiguration(ufg);
    }
    return eyes
}

function getSauceOptions() {
    const sauceOptions = {
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        name: 'Support Matrix JS'
    }
    const appiumVersion = process.env.APPIUM_VERSION;
    if (appiumVersion !== undefined) {
        sauceOptions.appiumVersion = appiumVersion;
    }
    return sauceOptions;
}

function getIOSCaps(ufg) {
    let caps = {
        browserName: '',
        platformName: 'iOS',
        "appium:platformVersion": '16.0',
        "appium:newCommandTimeout": 600,
        "appium:deviceName": 'iPhone 8 Simulator',
        "appium:automationName": 'XCUITest',
        'sauce:options': getSauceOptions()
    }
    if (ufg) {
        caps["appium:processArguments"] = {
            args: [],
            env: {
                DYLD_INSERT_LIBRARIES: "@executable_path/Frameworks/UFG_lib.xcframework/ios-arm64_x86_64-simulator/UFG_lib.framework/UFG_lib",
                NML_API_KEY: process.env.APPLITOOLS_API_KEY
            }
        }
        caps["appium:app"] = 'storage:filename=awesomeswift_nmg.app.zip'
    } else {
        caps["appium:app"] = 'storage:filename=awesomeswift_classic.app.zip'
    }
    setOrientation(caps)
    return caps
}


function getAndroidCaps(ufg) {
    let caps = {
        browserName: '',
        platformName: 'Android',
        "appium:platformVersion": '11.0',
        "appium:newCommandTimeout": 600,
        "appium:deviceName": 'Google Pixel 5 GoogleAPI Emulator',
        "appium:automationName": 'UiAutomator2',
        "appium:autoGrantPermissions": true,
        'sauce:options': getSauceOptions()
    }
    if (ufg) {
        caps["appium:optionalIntentArguments"] = `--es APPLITOOLS \'{\"NML_API_KEY\":\"${process.env.APPLITOOLS_API_KEY}\", \"NML_SERVER_URL\":\"https://eyesapi.applitools.com\"}\'`
        caps["appium:app"] = 'storage:filename=SimpleRandomStock_nmg.apk'
    } else {
        caps["appium:app"] = 'storage:filename=SimpleRandomStock_classic.apk'
    }
    setOrientation(caps)
    return caps
}

function setOrientation(caps) {
    if (ORIENTATION !== undefined) {
        caps["appium:orientation"] = ORIENTATION;
    }
}

module.exports = {
    setupEyes,
    setupDriver,
    teardownDriver,
    open,
    Target,
}