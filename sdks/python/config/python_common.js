'use strict'
const {getOS} = require('../../matrix/util')
const common = {
    "python-version": "3.11",
    eyes_package: "eyes-selenium",
    test_runner: "python"
}
const base_variations = [
    {
        os: "ubuntu-latest",
        version: "latest@",
    },
    {
        os: "windows-latest",
        version: "latest@",
    },
    {
        os: "macos-latest",
        version: "latest@",
    }
]
const containers = [
    {
        os: "ubuntu-latest",
        version: "latest@",
        use_container: true,
        container_name: 'alpine',
        container: 'artem0tranduil/alpine_runner:latest',
    },
    {
        os: "ubuntu-latest",
        version: "latest@",
        use_container: true,
        container_name: 'debian',
        container: 'artem0tranduil/debian_runner:3.1.2',
    },
]
const base_common = base_variations.map(variant => ({...common, ...variant,}))
const web_common = base_common.concat(containers.map(variant => ({...common, ...variant})))

module.exports = {web_common, getOS, base_common, common}