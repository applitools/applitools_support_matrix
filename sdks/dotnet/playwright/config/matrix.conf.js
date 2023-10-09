'use strict'
const {web_common, getOS} = require("../../config/dotnet_common")
const variations = web_common.map(variant => ({...variant,
        work_dir: 'sdks/dotnet/playwright',
        framework_package: "Microsoft.Playwright",
        eyes_package: "Eyes.Playwright",
        test_command: "pwsh bin/Debug/net7.0/playwright.ps1 install chromium && dotnet test -f net7.0 -- NUnit.NumberOfTestWorkers=1",
        job_name:`Dotnet Playwright [${getOS(variant)} | ${variant["dotnet-version"]} | client version: ${variant.version}]`
    }))
console.log(variations)
module.exports = {
    "include": variations
}
