const common = {
    "node-version": "18",
    "work_dir": "sdks/js/eyes-cypress/v10",
    "framework_package": "cypress",
    "test_runner": "js",
    "eyes_package": "@applitools/eyes-cypress",
    test_command: "npm test"
}
const latest_variations = [
    {
        "os": "ubuntu-latest",
        "version": "latest@",
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
        "os": "windows-latest",
        "version": "latest@",
    },
    {
        "os": "macos-latest",
        "version": "latest@",
    },
    // Container section -----------------
    // Cypress doesn't work on alpine at the moment: https://github.com/cypress-io/cypress/issues/419
    // {
    //     "os": "ubuntu-latest",
    //     "version": "latest@",
    //     use_container: true,
    //     container: 'artem0tranduil/alpine_runner:latest',
    //     container_name: 'alpine'
    // },
]

const old_variations = [
    {
        "os": "ubuntu-latest",
        "version": "exact@9.7.0",
    },
    {
        "os": "ubuntu-latest",
        "node-version": "16",
        "version": "exact@8.7.0",
    },
]


const base_common = latest_variations
    .map(variant => ({...common, ...variant,}))
    .concat(old_variations.map(variant => ({
    ...common, ...variant,
    work_dir: "sdks/js/eyes-cypress/v9"
})))
const variations = base_common.map(variant => ({
    ...variant,
    job_name: `JS Cypress [${variant.container_name ? variant.container_name :variant.os} | ${variant["node-version"]}] version: ${variant.version}`
}))
console.log(variations)
module.exports = {
    "include": variations
}
