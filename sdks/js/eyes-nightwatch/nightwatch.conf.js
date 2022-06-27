const {BrowserType} = require('@applitools/eyes-nightwatch')
module.exports = {
    src_folders: ['test'],
    custom_commands_path:  'node_modules/@applitools/eyes-nightwatch/commands',
    test_settings: {
        default: {
            disable_error_log: false,
            desiredCapabilities: {
                browserName : 'chrome',
                'goog:chromeOptions': {
                    w3c: false,
                    args: ["headless"],
                },
            },
            webdriver: {
                port: 4444,
                default_path_prefix: '/wd/hub',
                host: 'localhost'
            },
        },
    },
    eyes: {
        apiKey: process.env.APPLITOOLS_API_KEY, // You can get your api key from the Applitools dashboard
        batch: {
            name: 'Support Matrix Nightwatch'
        },
        browsersInfo: [
            {name: BrowserType.CHROME, width: 700, height: 460},
        ],
        useVisualGrid: process.env.USE_UFG !== undefined,
        concurrency: 5,
        dontCloseBatches: true,
        // enableEyesLogs: true
    }
}