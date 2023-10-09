'use strict'
const {web_common, getOS} = require("../../config/python_common")
const variations = web_common.filter(variation => variation.container_name !== 'alpine').map((variant) => ({
    ...variant,
    use_selenium: false,
    test_command: "playwright install && pytest -n 2",
    eyes_package: "eyes-playwright",
    framework_package: "playwright",
    work_dir: 'sdks/python/playwright',
    job_name: `Python Playwright [${getOS(variant)} | ${variant["python-version"]} | client version: ${variant.version}] `
}))
console.log(variations)
module.exports = {
    "include": variations
}
