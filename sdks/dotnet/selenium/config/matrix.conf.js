'use strict'
const {web_common, getOS} = require("../../config/dotnet_common")
let variations = web_common
    .map((variant) => ({
        ...variant,
        use_selenium: true,
        selenium_legacy: true,
        version: "exact@3.141.0",
        work_dir: 'sdks/dotnet/selenium',
        framework_package: "Selenium.WebDriver",
        eyes_package: "Eyes.Selenium",
        job_name: `Dotnet Selenium [${getOS(variant)} | ${variant["dotnet-version"]} | client version: ${variant.version}]`
    }))
variations = []
console.log(variations)
module.exports = {
    "include": variations
}
