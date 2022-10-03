'use strict'
const TEST_MATRIX = [
    'java',
    'ruby',
    'python',
    'dotnet',
    'js_selenium',
    'js_playwright',
    'js_webdriverio',
    'js_webdriverio4',
    'js_webdriverio5',
    'js_nightwatch',
    'js_protractor',
    'js_puppeteer',
    'js_cypress',
    'js_cypress_v9-',
    'js_testcafe',
    'js_storybook',
    'appium',
]

const MATRIX_MAPPING = {
    'java' : 'Java',
    'ruby' : 'Ruby',
    'python': 'Python',
    'dotnet': 'Dotnet',
    'js_selenium': 'JS Selenium',
    'js_playwright': 'JS Playwright',
    'js_webdriverio': 'JS Webdriverio',
    'js_webdriverio4': 'JS Webdriverio 4',
    'js_webdriverio5': 'JS Webdriverio 5',
    'js_nightwatch': 'JS Nightwatch',
    'js_protractor': 'JS Protractor',
    'js_puppeteer': 'JS Puppeteer',
    'js_cypress': 'JS Cypress',
    'js_cypress_v9-': 'JS Cypress legacy',
    'js_testcafe': 'JS Testcafe',
    'js_storybook': 'JS Storybook',
    'appium': 'Appium',

}

export {
    TEST_MATRIX,
    MATRIX_MAPPING
}