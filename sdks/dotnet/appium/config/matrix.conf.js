'use strict'
const {base_common, common} = require("../../config/dotnet_common")
const appium_common = base_common.map(variant => ({...variant, gh_environment: 'appium_latest'})).concat([
    {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_latest'},
    {...common, os:'ubuntu-latest', version:'latest@', gh_environment: 'appium_previous'},
    {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_previous'},
])
const variations = appium_common.map(variant => ({...variant,
        work_dir: 'sdks/dotnet/appium',
        framework_package: "Appium.WebDriver",
        eyes_package: "Eyes.Appium",
        use_appium: true,
        job_name:`Dotnet Appium [${variant.os} | ${variant["dotnet-version"]} | version: ${variant.version} | ${variant.gh_environment}]`
    }))
console.log(variations)
module.exports = {
    "include": variations
}
