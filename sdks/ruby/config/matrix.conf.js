const common = {
    "work_dir": "sdks/ruby",
    "framework_gem": "selenium-webdriver",
    "test_runner": "ruby",
    eyes_gem: "eyes_selenium"
}
const basic = {
    "version": "latest@",
    "ruby-version": "2.7",
    ...common
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
const base_common = base_variations.map(variant => ({...basic, ...variant,}))
const appium_common = base_common.map(variant => ({...variant, gh_environment: 'appium_latest'})).concat([
    {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_latest'},
    {...common, os:'ubuntu-latest', version:'latest@', gh_environment: 'appium_previous'},
    {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_previous'},
])
const variations = base_common
    .map((variant) => ({
        ...variant,
        use_selenium: true,
        test_command: "bundle exec rake -v",
        job_name: `Ruby Selenium [${variant.os} | ${variant["ruby-version"]} | client version: ${variant.version}] `
    }))
    .concat([{
        os: "ubuntu-latest",
        use_selenium: true,
        test_command: "bundle exec rake -v",
        version: "exact@4.1.0",
        "ruby-version": "2.6",
        job_name: `Ruby Selenium [ ubuntu-latest | 2.6 | client version: 4.1.0]`,
        ...common,
    }])
    .concat(appium_common.map(variant => ({
        ...variant,
        test_command: "bundle exec rake github:appium -v",
        eyes_gem: "eyes_appium",
        isAppium: true,
        job_name: `Ruby Appium [${variant.os} | ${variant["ruby-version"]} | client version: ${variant.version} | ${variant.gh_environment}] `
    })))
console.log(variations)
module.exports = {
    "include": variations
}
