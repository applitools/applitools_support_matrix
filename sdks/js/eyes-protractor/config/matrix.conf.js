const common = {
    "node-version": "18",
    "work_dir": "sdks/js/eyes-protractor",
    "framework_package": "protractor",
    use_selenium: true,
    selenium_legacy: true,
    js_config: "eyes-protractor",
    test_command: "npm test",
    "test_runner": "js",
    "eyes_package": "@applitools/eyes-protractor",
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
const alpine = {
    use_container: true,
    container: 'artem0tranduil/alpine_runner:latest',
    branch: 'protractor_container'
}
const variations = base_variations.map(variant => ({...common, ...variant,
    job_name:`JS Protractor [${variant.os} | ${common["node-version"]}] version: ${variant.version}`
})).concat([
    {
        ...common,
        ...alpine,
        "os": "ubuntu-latest",
        "version": "latest@",
        job_name:`JS Protractor [ alpine | ${common["node-version"]}] version: latest@`
    },
    {
        ...common,
        ...alpine,
        "os": "ubuntu-latest",
        "version": "major@2",
        job_name:`JS Protractor [ alpine | ${common["node-version"]}] version: major@2`
    },
])
console.log(variations)
module.exports = {
    "include": variations
}