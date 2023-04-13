const common = {
    "dotnet-version": "3.1.x",
    test_command: "dotnet test --no-build -- NUnit.NumberOfTestWorkers=1",
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
const base_common = base_variations.map(variant => ({...common, ...variant,}))
const appium_common = base_common.map(variant => ({...variant, gh_environment: 'appium_latest'})).concat([
    {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_latest'},
    {...common, os:'ubuntu-latest', version:'latest@', gh_environment: 'appium_previous'},
    {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_previous'},
])
const variations = base_common
    .map((variant) => ({...variant,
        use_selenium: true,
        selenium_legacy: true,
        version: "exact@3.141.0",
        work_dir: 'sdks/dotnet/selenium',
        framework_package: "Selenium.WebDriver",
        eyes_package: "Eyes.Selenium",
        job_name:`Dotnet Selenium [${variant.os} | ${variant["dotnet-version"]} | client version: ${variant.version}]`
    }))
    .concat(base_common.map(variant => ({...variant,
        use_selenium: true,
        work_dir: 'sdks/dotnet/selenium',
        framework_package: "Selenium.WebDriver",
        eyes_package: "Eyes.Selenium4",
        job_name:`Dotnet Selenium4 [${variant.os} | ${variant["dotnet-version"]} | client version: ${variant.version}]`
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
