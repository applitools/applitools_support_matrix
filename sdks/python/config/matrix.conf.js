const common = {
    "python-version": "3.10",
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
        work_dir: 'sdks/python/selenium',
        job_name: `Python Selenium [${variant.os} | ${variant["python-version"]} | client version: ${variant.version}] `
    }))
    .concat(base_common.map((variant) => ({...variant,
        use_selenium: false,
        test_command: "pytest -n 2",
        eyes_package: "eyes-playwright",
        framework_package: "playwright",
        work_dir: 'sdks/python/playwright',
        job_name: `Python Playwright [${variant.os} | ${variant["python-version"]} | client version: ${variant.version}] `
    })))
    .concat(appium_common.map(variant => ({...variant,
        test_command: "pytest",
        framework_package: "Appium-Python-Client",
        isAppium: true,
        work_dir: 'sdks/python/appium',
        job_name: `Python Appium [${variant.os} | ${variant["python-version"]} | client version ${variant.version}]`
    })))
console.log(variations)
module.exports = {
    "include": variations
}
