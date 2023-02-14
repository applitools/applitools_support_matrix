const common = {
    "dotnet-version": "3.1.x",
}
const base_variations = [
    {
        "os": "ubuntu-latest",
    },
    {
        "os": "windows-latest",
    },
    {
        "os": "macos-latest",
    }
]
const base_common = base_variations.map(variant => ({...common, ...variant,}))
const variations = base_common
    .map((variant) => ({...variant,
        use_selenium: true,
        work_dir: 'sdks/dotnet/selenium',
        test_command: "dotnet add package Eyes.Selenium && dotnet test -- NUnit.NumberOfTestWorkers=1"
    }))
    .concat(base_common.map(variant => ({...variant,
        work_dir: 'sdks/dotnet/appium',
        test_command: "dotnet add package Eyes.Appium && dotnet test -- NUnit.NumberOfTestWorkers=1"
    })))
    .map(variant => ({...variant, job_name:`Dotnet ${variant.use_selenium ? 'Selenium' : 'Appium'} [${variant.os}]`}))
console.log(variations)
module.exports = {
    "include": variations
}
