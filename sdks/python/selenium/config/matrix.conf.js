'use strict'
const {web_common, getOS} = require("../../config/python_common")
const variations = web_common
    .map((variant) => ({
        ...variant,
        use_selenium: true,
        test_command: "pytest -n 2",
        framework_package: "selenium",
        work_dir: 'sdks/python/selenium',
        job_name: `Python Selenium [${getOS(variant)} | ${variant["python-version"]} | client version: ${variant.version}] `
    }))
console.log(variations)
module.exports = {
    "include": variations
}
