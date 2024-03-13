'use strict'
const {base_common, getOS, common} = require("../../config/python_common")
const appium_common = base_common.map(variant => ({...variant, gh_environment: 'appium_latest'})).concat([
    {...common, os:'ubuntu-latest', version:'major@1', gh_environment: 'appium_latest'},
    {...common, os:'ubuntu-latest', version:'latest@', gh_environment: 'appium_previous'},
    {...common, os:'ubuntu-latest', version:'major@1', gh_environment: 'appium_previous'},
])
const variations = appium_common.map(variant => ({...variant,
        test_command: "pytest",
        framework_package: "Appium-Python-Client",
        use_appium: true,
        work_dir: 'sdks/python/appium',
        job_name: `Python Appium [${getOS(variant)} | ${variant["python-version"]} | client version ${variant.version}]`
    }))
console.log(variations)
module.exports = {
    "include": variations
}
