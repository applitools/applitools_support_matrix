'use strict'
const {getOS} = require('../../matrix/util')
const common = {
    "dotnet-version": "7.0",
    test_command: "dotnet test -f net7.0 -- NUnit.NumberOfTestWorkers=1",
    "test_runner": "dotnet"
}
const base_variations = [
    {
        os: "ubuntu-latest",
        version: "latest@"
    },
    {
        os: "windows-latest",
        version: "latest@"
    },
    {
        os: "macos-latest",
        version: "latest@"
    }
]
const containers = [
    {
        "dotnet-version": "7",
        os: "ubuntu-latest",
        version: "latest@",
        use_container: true,
        container_name: 'alpine',
        container: 'artem0tranduil/alpine_runner:latest',
    },
    {
        "dotnet-version": "7",
        os: "ubuntu-latest",
        version: "latest@",
        use_container: true,
        container_name: 'debian',
        container: 'artem0tranduil/debian_runner:latest',
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
        selenium_legacy: true,
        version: "exact@3.141.0",
        work_dir: 'sdks/dotnet/selenium',
        framework_package: "Selenium.WebDriver",
        eyes_package: "Eyes.Selenium",
        job_name:`Dotnet Selenium [${getOS(variant)} | ${variant["dotnet-version"]} | client version: ${variant.version}]`
    }))
    .concat(web_common.map(variant => ({...variant,
        use_selenium: true,
        work_dir: 'sdks/dotnet/selenium',
        framework_package: "Selenium.WebDriver",
        eyes_package: "Eyes.Selenium4",
        job_name:`Dotnet Selenium4 [${getOS(variant)} | ${variant["dotnet-version"]} | client version: ${variant.version}]`
    })))
    .concat(web_common.map(variant => ({...variant,
        work_dir: 'sdks/dotnet/playwright',
        framework_package: "Microsoft.Playwright",
        eyes_package: "Eyes.Playwright",
        job_name:`Dotnet Playwright [${getOS(variant)} | ${variant["dotnet-version"]} | client version: ${variant.version}]`
    })))
    .concat(appium_common.map(variant => ({...variant,
        work_dir: 'sdks/dotnet/appium',
        framework_package: "Appium.WebDriver",
        eyes_package: "Eyes.Appium",
        use_appium: true,
        job_name:`Dotnet Appium [${variant.os} | ${variant["dotnet-version"]} | version: ${variant.version} | ${variant.gh_environment}]`
    })))
console.log(variations)
module.exports = {
    "include": variations
}
