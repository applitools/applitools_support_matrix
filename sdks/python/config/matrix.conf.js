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
const appium_common = base_common.map(variant => ({...variant, gh_environment: 'appium_latest'})).concat([
    {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_latest'},
    {...common, os:'ubuntu-latest', version:'latest@', gh_environment: 'appium_previous'},
    {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_previous'},
])
const variations = base_common
    .map((variant) => ({...variant,
        use_selenium: true,
        test_command: "pytest -n 2",
        framework_package: "selenium",
        job_name: `Python Selenium [${variant.os} | ${variant["python-version"]} | client version: ${variant.version}] `
    }))
    .concat(appium_common.map(variant => ({...variant,
        test_command: "pytest -c appium.ini",
        framework_package: "Appium-Python-Client",
        isAppium: true,
        job_name: `Python Appium [${variant.os} | ${variant["python-version"]} | client version ${variant.version}]`
    })))
console.log(variations)
module.exports = {
    "include": variations
}
