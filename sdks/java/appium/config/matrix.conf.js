const {base_common, common, appium_package} = require("../../config/java_common")
const appium_common = base_common.map(variant => ({...variant, gh_environment: 'appium_latest'})).concat([
    // {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_latest'},
    {...common, os: 'ubuntu-latest', version: 'latest@', gh_environment: 'appium_previous'},
    // {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_previous'},
])
const variations = appium_common.map(variant => ({
        ...variant,
        ...appium_package,
        use_appium: true,
        job_name: `Java Appium [${variant.os} | ${variant["java-version"]} | client version: ${variant.version} | ${variant.gh_environment}] `
    }))
console.log(variations)
module.exports = {
    "include": variations
}
