'use strict';
const {base_common, common} = require("../../config/ruby_common")
const appium_common = base_common.map(variant => ({...variant, gh_environment: 'appium_latest'})).concat([
    {...common, "ruby-version": "3.2", os: 'ubuntu-latest', version: 'previous@1', gh_environment: 'appium_latest'},
    {...common, "ruby-version": "3.2", os: 'ubuntu-latest', version: 'latest@', gh_environment: 'appium_previous'},
    {...common, "ruby-version": "3.2", os: 'ubuntu-latest', version: 'previous@1', gh_environment: 'appium_previous'},
])
const variations = appium_common.map(variant => ({
        ...variant,
        eyes_gem: "eyes_appium",
        use_appium: true,
        work_dir: "sdks/ruby/appium",
        framework_gem: "appium_lib",
        job_name: `Ruby Appium [${variant.os} | ${variant["ruby-version"]} | client version: ${variant.version} | ${variant.gh_environment}] `
    }))
console.log(variations)
module.exports = {
    "include": variations
}
