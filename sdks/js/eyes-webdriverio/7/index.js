const {Eyes, VisualGridRunner, Target, AndroidDeviceName, AndroidVersion, IosVersion, IosDeviceName, ScreenOrientation} = require("@applitools/eyes-webdriverio")
const {remote} = require('webdriverio');
const SAUCE_HOSTNAME = "ondemand.us-west-1.saucelabs.com";
const SAUCE_PORT = 443;

async function setupDriver(options) {
    let appium, ufg, platform;
    if (options) {
        ({appium, ufg, platform} = options)
    } else {
        appium = false
        ufg = false
    }
    if (appium) {
        const capabilities = platform==='iOS' ? getIOSCaps(ufg) : getAndroidCaps(ufg)
        const driver_config = {
            capabilities,
            logLevel: 'silent',
            port: SAUCE_PORT,
            hostname: SAUCE_HOSTNAME,
            path: '/wd/hub',
            protocol: 'https'
        }
        return await remote(driver_config);
    } else {
        // Use Chrome browser
        const chrome = {
            capabilities: {
                browserName: 'chrome',
                'goog:chromeOptions': {
                    args: ['headless']
                }
            },
            logLevel: 'silent',
            host: process.env.SELENIUM_SERVER_HOST || '127.0.0.1'
        };
        return await remote(chrome);
    }
}

async function teardownDriver(driver) {
    await driver.deleteSession();
}

async function open(driver, url) {
    await driver.url(url)
}

const batch = {
    name: process.env.APPLITOOLS_BATCH_NAME || 'JS Support Matrix Eyes WebdriverIO 7',
}

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
    if (appium && vg) {
        const ufg = eyes.getConfiguration();
        if (platform === 'iOS') {
            ufg.addBrowser({
                iosDeviceInfo: {
                    deviceName: IosDeviceName.iPhone_8,
                    screenOrientation: ScreenOrientation.PORTRAIT,
                    iosVersion: IosVersion.LATEST
                }
            })
        }
        if (platform === 'Android') {
            ufg.addBrowser({
                androidDeviceInfo: {
                    deviceName: AndroidDeviceName.Pixel_5,
                    screenOrientation: ScreenOrientation.PORTRAIT,
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
    return caps
}

module.exports = {
    setupEyes,
    setupDriver,
    teardownDriver,
    open,
    Target,
}