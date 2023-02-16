const common = {
    "dotnet-version": "3.1.x",
    test_command: "dotnet build && dotnet list package && dotnet test --no-build -- NUnit.NumberOfTestWorkers=1"
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
const variations = base_common
    .map((variant) => ({...variant,
        use_selenium: true,
        selenium_legacy: true,
        version: "exact@3.141.0",
        work_dir: 'sdks/dotnet/selenium',
        framework_package: "Selenium.WebDriver",
        eyes_package: "Eyes.Selenium",
    }))
    .concat(base_common.map(variant => ({...variant,
        use_selenium: true,
        work_dir: 'sdks/dotnet/selenium',
        framework_package: "Selenium.WebDriver",
        eyes_package: "Eyes.Selenium4",
    })))
    .concat(base_common.map(variant => ({...variant,
        work_dir: 'sdks/dotnet/appium',
        framework_package: "Appium.WebDriver",
        eyes_package: "Eyes.Appium",
    })))
    .map(variant => ({...variant, job_name:`Dotnet ${variant.use_selenium ? 'Selenium' : 'Appium'} [${variant.os}]`}))
console.log(variations)
module.exports = {
    "include": variations
}
