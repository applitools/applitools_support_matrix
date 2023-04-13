const common = {
    "node-version": "18",
    "eyes_package": "@applitools/eyes-selenium",
    "work_dir": "sdks/js/eyes-selenium",
    "js_config": "eyes-selenium",
    "framework_package": "selenium-webdriver",
    "test_runner": "js"
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
const containers = [
    {
        ...common,
        "os": "ubuntu-latest",
        "version": "latest@",
        container: "alpine",
        use_selenium: true,
        test_command: "npm test"
    },
    {
        ...common,
        "os": "ubuntu-latest",
        "version": "latest@",
        container: "debian",
        use_selenium: true,
        test_command: "npm test"
    },
]
const variations = base_common
    .map((variant) => ({
        ...variant,
        use_selenium: true,
        test_command: "npm test",
        job_name: `JS Selenium [${variant.os} | ${variant["node-version"]} | version: ${variant.version}]`
    }))
    .concat(appium_common.map(variant => (
        {
            ...variant,
            test_command: "npm run appium",
            use_appium: true,
            job_name: `JS Appium [${variant.os} | ${variant["node-version"]} | client version: ${variant.version} | ${variant.gh_environment} ] `
        })))
    // .concat(containers)
console.log(variations)
module.exports = {
    "include": variations
}
