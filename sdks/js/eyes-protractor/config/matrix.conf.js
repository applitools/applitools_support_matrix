const common = {
    "node-version": "18",
    "work_dir": "sdks/js/eyes-protractor",
    "framework_package": "protractor",
    use_selenium: true,
    js_config: "eyes-protractor",
    test_command: "npm test"
}
const base_variations = [
    {
        "os": "ubuntu-latest",
        "version": "latest@",
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
const variations = base_variations.map(variant => ({...common, ...variant, job_name:`JS Protractor [${variant.os} | ${variant.version}]`}))
console.log(variations)
module.exports = {
    "include": variations
}