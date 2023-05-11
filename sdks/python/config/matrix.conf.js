'use strict'
const {getOS} = require('../../matrix/util')
const common = {
    "python-version": "3.10",
    eyes_package: "eyes-selenium",
    test_runner: "python"
}
const base_variations = [
    {
        os: "ubuntu-latest",
        version: "latest@",
    },
    {
        os: "windows-latest",
        version: "latest@",
    },
    {
        os: "macos-latest",
        version: "latest@",
    }
]
const containers = [
    {
        os: "ubuntu-latest",
        version: "latest@",
        use_container: true,
        container: 'artem0tranduil/alpine_runner:latest',
    },
]
const base_common = base_variations.map(variant => ({...common, ...variant,}))
const web_common = base_common.concat(containers.map(variant => ({...common, ...variant})))
const appium_common = base_common.map(variant => ({...variant, gh_environment: 'appium_latest'})).concat([
    {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_latest'},
    {...common, os:'ubuntu-latest', version:'latest@', gh_environment: 'appium_previous'},
    {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_previous'},
])
const variations = web_common
    .map((variant) => ({...variant,
        use_selenium: true,
        test_command: "pytest -n 2",
        framework_package: "selenium",
        work_dir: 'sdks/python/selenium',
        job_name: `Python Selenium [${getOS(variant)} | ${variant["python-version"]} | client version: ${variant.version}] `
    }))
    .concat(web_common.map((variant) => ({...variant,
        use_selenium: false,
        test_command: "playwright install && pytest -n 2",
        eyes_package: "eyes-playwright",
        framework_package: "playwright",
        work_dir: 'sdks/python/playwright',
        job_name: `Python Playwright [${getOS(variant)} | ${variant["python-version"]} | client version: ${variant.version}] `
    })))
    .concat(web_common.map((variant) => ({...variant,
        use_selenium: false,
        test_command: "robot ./web",
        eyes_package: "eyes-robotframework",
        framework_package: "robotframework",
        work_dir: 'sdks/python/robot',
        job_name: `Python Robotframework [${getOS(variant)} | ${variant["python-version"]} | client version: ${variant.version}] `
    })))
    .concat(appium_common.map(variant => ({...variant,
        test_command: "pytest",
        framework_package: "Appium-Python-Client",
        use_appium: true,
        work_dir: 'sdks/python/appium',
        job_name: `Python Appium [${getOS(variant)} | ${variant["python-version"]} | client version ${variant.version}]`
    })))
console.log(variations)
module.exports = {
    "include": variations
}
