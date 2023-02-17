const common = {
    "node-version": "18",
    "work_dir": "sdks/js/eyes-playwright",
    "framework_package": "playwright",
    test_command: "npx playwright install --with-deps && npm test"
}
const base_variations = [
    {
        "os": "ubuntu-latest",
        "version": "latest@",
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
    }
]
const variations = base_variations.map(variant => ({...common, ...variant,
    job_name:`JS Playwright [${variant.os} | ${variant["node-version"]}] version: ${variant.version}`
}))
console.log(variations)
module.exports = {
    "include": variations
}