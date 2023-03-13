const common = {
    "python-version": "3.10",
    "work_dir": "sdks/python",
    eyes_package: "eyes-selenium",
    "test_runner": "python"
}
const base_variations = [
    {
        "os": "ubuntu-latest",
        "version": "latest@",
    },
    {
        "os": "windows-latest",
        "version": "latest@",
    },
    {
        "os": "macos-latest",
        "version": "latest@",
    }
]
const base_common = base_variations.map(variant => ({...common, ...variant,}))
const variations = base_common
    .map((variant) => ({...variant,
        use_selenium: true,
        test_command: "pytest -n 2",
        framework_package: "selenium"
    }))
    .concat(base_common.map(variant => ({...variant,
        test_command: "pytest -c appium.ini",
        framework_package: "Appium-Python-Client"
    })))
    .map(variant => ({...variant, job_name:`Python ${variant.use_selenium ? 'Selenium' : 'Appium'} [${variant.os} | ${variant["python-version"]}] version: ${variant.version}`}))
console.log(variations)
module.exports = {
    "include": variations
}
