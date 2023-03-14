const common = {
    "node-version": "18",
    "work_dir": "sdks/js/eyes-nightwatch",
    "framework_package": "nightwatch",
    "test_runner": "js",
    "eyes_package": "@applitools/eyes-nightwatch",
    use_selenium: true,
    test_command: "npm test && USE_UFG=true npm test"
}
const base_variations = [
    {
        "os": "ubuntu-latest",
        "version": "exact@1.7.13",
    },
    {
        "os": "windows-latest",
        "version": "exact@1.7.13",
    },
    {
        "os": "macos-latest",
        "version": "exact@1.7.13",
    }
]
const variations = base_variations.map(variant => ({...common, ...variant,
    job_name:`JS Nightwatch [${variant.os} | ${variant["node-version"]}] version: ${variant.version}`
}))
console.log(variations)
module.exports = {
    "include": variations
}
