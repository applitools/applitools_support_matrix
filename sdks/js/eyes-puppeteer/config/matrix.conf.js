'use strict'
const {getOS} = require('../../../matrix/util')
const common = {
    "node-version": "18",
    "work_dir": "sdks/js/eyes-puppeteer",
    "framework_package": "puppeteer",
    js_config: "eyes-puppeteer",
    test_command: "npm test",
    "test_runner": "js",
    "eyes_package": "@applitools/eyes-puppeteer",
}
const base_variations = [
    {
        "os": "ubuntu-latest",
        "version": "latest@",
    },
    {
        "os": "ubuntu-latest",
        "version": "latest@",
        use_container: true,
        container: 'artem0tranduil/alpine_runner:latest',
        container_name: 'alpine'
    },
    {
        "os": "ubuntu-latest",
        "version": "major@1",
    },
    {
        "os": "ubuntu-latest",
        "version": "major@2",
    },
    {
        "os": "ubuntu-latest",
        "version": "major@3",
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
const variations = base_variations.map(variant => ({...common, ...variant,
    job_name:`JS Puppeteer [${getOS(variant)} | ${common["node-version"]}] version: ${variant.version}]`
}))
console.log(variations)
module.exports = {
    "include": variations
}