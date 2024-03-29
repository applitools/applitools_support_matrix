'use strict'
const {getOS} = require('../../../matrix/util')
const common = {
    "node-version": "18",
    "work_dir": "sdks/js/eyes-testcafe",
    "framework_package": "testcafe",
    "test_runner": "js",
    "eyes_package": "@applitools/eyes-testcafe",
    test_command: "npm test",
    legacy_npm_peers: true,
}
const base_variations = [
    {
        "os": "ubuntu-latest",
        "version": "major@1",
    },
    {
        "os": "windows-latest",
        "version": "major@1",
        test_command: 'npm run test:windows'
    },
    {
        "os": "ubuntu-latest",
        "version": "major@1",
        use_container: true,
        container: 'artem0tranduil/alpine_runner:latest',
        container_name: 'alpine',
        test_command: 'npm run test:alpine'
    },
    {
        "os": "ubuntu-latest",
        "version": "major@1",
        use_container: true,
        container: 'artem0tranduil/debian_runner:latest',
        container_name: 'debian',
        test_command: 'npm run test'
    },
]
const variations = base_variations.map(variant => ({...common, ...variant,
    job_name:`JS Testcafe [${getOS(variant)} | ${common["node-version"]}] version: ${variant.version}`
}))
console.log(variations)
module.exports = {
    "include": variations
}