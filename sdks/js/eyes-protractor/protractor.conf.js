'use strict'

// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
    seleniumAddress: `http://localhost:4444/wd/hub`,
    suites: {
        default: '../tests/support/*.spec.js'
    },
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: ['headless','--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
        }
    },
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000,
    }
}