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
const variations = base_common.map((variant) => ({...variant, use_selenium: true, test_command: "npm test"}))
    .concat(base_common.map(variant => ({...variant, test_command: "npm run appium", isAppium: true})))
    .map(variant => ({...variant,
        job_name:`JS ${variant.use_selenium ? 'Selenium' : 'Appium'} [${variant.os} | ${variant["node-version"]}] version: ${variant.version}`
    }))
console.log(variations)
module.exports = {
    "include": variations
}
