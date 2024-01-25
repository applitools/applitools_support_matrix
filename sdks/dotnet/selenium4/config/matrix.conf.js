'use strict'
const {web_common, getOS} = require("../../config/dotnet_common")
let variations = web_common
    .filter(variant => variant.os !== 'windows-latest')
    .map(variant => ({
        ...variant,
        use_selenium: true,
        work_dir: 'sdks/dotnet/selenium4',
        framework_package: "Selenium.WebDriver",
        eyes_package: "Eyes.Selenium4",
        job_name: `Dotnet Selenium4 [${getOS(variant)} | ${variant["dotnet-version"]} | client version: ${variant.version}]`
    }))
console.log(variations)
module.exports = {
    "include": variations
}
