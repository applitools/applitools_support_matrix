'use strict'
const {getOS} = require('../../../matrix/util')
const common = {
    "node-version": "18",
    "work_dir": "sdks/js/eyes-playwright",
    "framework_package": "playwright",
    "test_runner": "js",
    "eyes_package": "@applitools/eyes-playwright",
    test_command: "npx playwright install --with-deps && npm test"
}
const base_variations = [
    {
        "os": "ubuntu-latest",
        "version": "latest@",
    },
    {
        "os": "ubuntu-latest",
        "version": "exact@next",
        legacy_npm_peers: true,
    },
    {
        "os": "ubuntu-latest",
        "version": "minor@1",
    },
    {
        "os": "ubuntu-latest",
        "version": "minor@2",
    },
    {
        "os": "windows-latest",
        "version": "latest@",
    },
    {
        "os": "macos-latest",
        "version": "latest@",
    },
    {
        "os": "ubuntu-latest",
        "version": "latest@",
        use_container: true,
        container: 'artem0tranduil/alpine_runner:latest',
        container_name: 'alpine',
        test_command: "npm test"
    },
    {
        "os": "ubuntu-latest",
        "version": "latest@",
        use_container: true,
        container: 'artem0tranduil/debian_runner:latest',
        container_name: 'debian',
        test_command: "npm test"
    },
]
const variations = base_variations.map(variant => ({
    ...common, ...variant,
    job_name: `JS Playwright [${getOS(variant)} | ${common["node-version"]}] version: ${variant.version}`
}))
console.log(variations)
module.exports = {
    "include": variations
}