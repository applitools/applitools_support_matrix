const common = {
    "node-version": "18",
    use_selenium: true,
    "framework_package": "webdriverio",
    "test_runner": "js",
    "eyes_package": "@applitools/eyes-webdriverio",
    test_command: "npm test"
}

const wdio5 = {
    "version": "exact@5.23.0",
    "work_dir": "sdks/js/eyes-webdriverio/5",
    "js_config": "eyes-webdriverio/5",
    "selenium_legacy": true
}
const wdio6 = {
    "version": "exact@6.12.1",
    "work_dir": "sdks/js/eyes-webdriverio/6",
    "js_config": "eyes-webdriverio/6",
}
const wdio = {
    "work_dir": "sdks/js/eyes-webdriverio/7",
    "js_config": "eyes-webdriverio/7",
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

const alpine = {
    use_container: true,
    use_selenium: false,
    container: 'artem0tranduil/alpine_runner:latest',
    service: 'selenium/standalone-chrome:latest',
}

const containers = [
    {
        ...common,
        ...wdio,
        ...alpine,
        "os": "ubuntu-latest",
        "version": "latest@",
        job_name: `JS WDIO [ alpine | 18 | version: latest@]`,
    },
    {
        ...common,
        ...wdio,
        ...alpine,
        "os": "ubuntu-latest",
        "version": "major@1",
        job_name: `JS WDIO [ alpine | 18 | version: major@1]`,
    },
    {
        ...common,
        ...wdio6,
        ...alpine,
        "os": "ubuntu-latest",
        "version": "latest@",
        job_name: `JS WDIO [ alpine | 18 | version: latest@]`,
    },
    {
        ...common,
        ...wdio5,
        ...alpine,
        "os": "ubuntu-latest",
        "version": "latest@",
        job_name: `JS WDIO [ alpine | 18 | version: latest@]`,
    },
]
const base_common = base_variations.map(variant => ({ ...variant,...common,}))
const appium_common = base_variations.map(variant => ({...common,...variant, gh_environment: 'appium_latest'})).concat([
    {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_latest'},
    {...common, os:'ubuntu-latest', version:'latest@', gh_environment: 'appium_previous'},
    {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_previous'},
])
const variations = base_common
    .map(variant => ({...variant, ...wdio}))
    .concat(base_common.map(variant => ({...variant, ...wdio5})))
    .concat(base_common.map(variant => ({...variant, ...wdio6})))
    .concat(base_common.map(variant => ({...variant, ...wdio, "version": "major@1"})))
    .map(variant => ({...variant, job_name:`JS WDIO [${variant.os} | ${variant["node-version"]} | version: ${variant.version} ]`
    }))
    .concat(appium_common.map(variant => ({...variant, ...wdio,
        use_selenium: false,
        test_command: 'npm run appium',
        use_appium: true,
        job_name:`JS WDIO Appium [${variant.os} | ${variant["node-version"]} | client version: ${variant.version} | ${variant.gh_environment} ]`
    })))
    .concat(containers)
console.log(variations)
module.exports = {
    "include": variations
}
