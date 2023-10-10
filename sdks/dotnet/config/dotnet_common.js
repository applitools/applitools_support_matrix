'use strict'
const {getOS} = require('../../matrix/util')
const common = {
    "dotnet-version": "7.0",
    test_command: "dotnet test -f net7.0 -- NUnit.NumberOfTestWorkers=1",
    "test_runner": "dotnet"
}
const base_variations = [
    {
        os: "ubuntu-latest",
        version: "latest@"
    },
    {
        os: "windows-latest",
        version: "latest@"
    },
    {
        os: "macos-latest",
        version: "latest@"
    }
]
const containers = [
    {
        "dotnet-version": "7",
        os: "ubuntu-latest",
        version: "latest@",
        use_container: true,
        container_name: 'alpine',
        container: 'artem0tranduil/alpine_runner:latest',
    },
    {
        "dotnet-version": "7",
        os: "ubuntu-latest",
        version: "latest@",
        use_container: true,
        container_name: 'debian',
        container: 'artem0tranduil/debian_runner:latest',
    },
]
const base_common = base_variations.map(variant => ({...common, ...variant,}))
const web_common = base_common.concat(containers.map(variant => ({...common, ...variant})))

module.exports = {
    web_common,
    base_common,
    containers,
    base_variations,
    common,
    getOS,
}