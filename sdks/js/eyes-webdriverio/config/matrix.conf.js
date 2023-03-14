const common = {
    "node-version": "18",
    use_selenium: true,
    "framework_package": "webdriverio",
    "test_runner": "js",
    "eyes_package": "@applitools/eyes-webdriverio",
    test_command: "npm test"
}
const wdio4 = {
    "work_dir": "sdks/js/eyes-webdriverio/4",
    "version": "exact@4.14.4",
    "eyes_package": "@applitools/eyes.webdriverio"
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
const base_common = base_variations.map(variant => ({ ...variant,...common,}))
const variations = base_common.map((variant) => ({...variant, ...wdio4 }))
    .concat(base_common.map(variant => ({...variant, ...wdio5})))
    .concat(base_common.map(variant => ({...variant, ...wdio6})))
    .concat(base_common.map(variant => ({...variant, ...wdio})))
    .concat(base_common.map(variant => ({...variant, ...wdio, "version": "major@1"})))
    .map(variant => ({...variant,
        job_name:`JS ${variant.use_selenium ? 'WDIO' : 'WDIO Appium'} [${variant.os} | ${variant["node-version"]}] version: ${variant.version}`
    }))
console.log(variations)
module.exports = {
    "include": variations
}
