const common = {
    "node-version": "18",
    "work_dir": "sdks/js/eyes-testcafe",
    "framework_package": "testcafe",
    test_command: "npm test"
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
        "version": "major@1",
    },
    {
        "os": "windows-latest",
        "version": "latest@",
    }
]
const variations = base_variations.map(variant => ({...common, ...variant, job_name:`JS Testcafe [${variant.os} | ${variant.version}]`}))
console.log(variations)
module.exports = {
    "include": variations
}