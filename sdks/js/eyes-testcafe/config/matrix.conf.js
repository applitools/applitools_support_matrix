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
    },
    {
        "os": "ubuntu-latest",
        "version": "major@1",
        use_container: true,
        container: 'artem0tranduil/alpine_runner:latest',
        container_name: 'alpine'
    },
]
const variations = base_variations.map(variant => ({...common, ...variant,
    job_name:`JS Testcafe [${variant.container_name ? variant.container_name :variant.os} | ${common["node-version"]}] version: ${variant.version}`
}))
console.log(variations)
module.exports = {
    "include": variations
}