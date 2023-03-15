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
    }
]

const old_variations = [
    {
        "os": "ubuntu-latest",
        "version": "exact@9.7.0",
    },
    {
        "os": "ubuntu-latest",
        "version": "exact@8.7.0",
    },
]


const base_common = latest_variations.map(variant => ({...common, ...variant,})).concat(old_variations.map(variant => ({
    ...common, ...variant,
    work_dir: "sdks/js/eyes-cypress/v9"
})))
const variations = base_common.map(variant => ({
    ...variant,
    job_name: `JS Cypress [${variant.os} | ${variant["node-version"]}] version: ${variant.version}`
}))
console.log(variations)
module.exports = {
    "include": variations
}
