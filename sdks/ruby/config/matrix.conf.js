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
const variations = base_common
    .map((variant) => ({
        ...variant,
        use_selenium: true,
        test_command: "bundle exec rake"
    }))
    .concat([{
        os: "ubuntu-latest",
        use_selenium: true,
        test_command: "bundle exec rake",
        version: "exact@4.1.0",
        "ruby-version": "2.6",
        ...common,
    }])
    .concat(base_common.map(variant => ({
        ...variant,
        test_command: "bundle exec rake github:appium",
        eyes_gem: "eyes_appium",
        isAppium: true
    })))
    .map(variant => ({...variant,
        job_name: `Ruby ${variant.use_selenium ? 'Selenium' : 'Appium'} [${variant.os} | ${variant["ruby-version"]}] version: ${variant.version}`
    }))
console.log(variations)
module.exports = {
    "include": variations
}
