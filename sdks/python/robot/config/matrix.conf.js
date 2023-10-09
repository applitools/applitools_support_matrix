'use strict'
const {web_common, getOS} = require("../../config/python_common")
const variations = web_common.map((variant) => ({
    ...variant,
    use_selenium: false,
    test_command: "robot ./web",
    eyes_package: "eyes-robotframework",
    framework_package: "robotframework",
    work_dir: 'sdks/python/robot',
    job_name: `Python Robotframework [${getOS(variant)} | ${variant["python-version"]} | client version: ${variant.version}] `
}))
console.log(variations)
module.exports = {
    "include": variations
}
