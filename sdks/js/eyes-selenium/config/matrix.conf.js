const common = {
    "node-version": "18",
    "eyes_package": "@applitools/eyes-selenium",
    "js_config": "eyes-selenium",
    "framework_package": "selenium-webdriver",
    "test_runner": "js",
    work_dir: "sdks/js/eyes-selenium/support",
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
const base_common = base_variations.map(variant => ({...common, ...variant}))
const appium_common = base_common.map(variant => ({...variant, gh_environment: 'appium_latest'})).concat([
    {...common, os: 'ubuntu-latest', version: 'previous@1', gh_environment: 'appium_latest'},
    {...common, os: 'ubuntu-latest', version: 'latest@', gh_environment: 'appium_previous'},
    {...common, os: 'ubuntu-latest', version: 'previous@1', gh_environment: 'appium_previous'},
])
const containers = [
    {
        ...common,
        "os": "ubuntu-latest",
        "version": "latest@",
        use_container: true,
        use_selenium: true,
        work_dir: "sdks/js/eyes-selenium/support",
        container: 'artem0tranduil/alpine_runner:latest',
        container_name: 'alpine',
        job_name: `JS Selenium [ alpine | 18 | version: latest@]`,
        test_command: "npm test"
    },
    {
        ...common,
        "os": "ubuntu-latest",
        "version": "latest@",
        use_container: true,
        use_selenium: true,
        work_dir: "sdks/js/eyes-selenium/support",
        container: 'artem0tranduil/debian_runner:latest',
        container_name: 'debian',
        job_name: `JS Selenium [ debian | 18 | version: latest@]`,
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
    .concat(containers)
    .concat(base_common.map((variant) => ({
        ...variant,
        test_command: "npm run ci-test",
        work_dir: "sdks/js/eyes-selenium/tunnel",
        job_name: `JS Selenium EC_Tunnel [${variant.os} | ${variant["node-version"]} | version: ${variant.version}]`
    })))

console.log(variations)
module.exports = {
    "include": variations
}
