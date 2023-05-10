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
        "version": "latest@",
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
    service: 'selenium/standalone-chrome:latest',
}
const base_common = base_variations.map(variant => ({...variant, ...common,}))
const variations = base_common
    .concat(base_common.map(variant => ({
        ...variant,
        version: 'exact@1.7.13',
        selenium_legacy: true,
        test_command: "npm run nightwatch1 && USE_UFG=true npm run nightwatch1"
    })))
    .concat([{...common, os: "ubuntu-latest", version: "exact@alpha", legacy_npm_peers: true}])
    .map(variant => ({
        ...variant,
        job_name: `JS Nightwatch [${variant.os} | ${common["node-version"]}] version: ${variant.version}`
    }))
    .concat([{
        ...common,
        ...alpine,
        os: "ubuntu-latest",
        version: "latest@",
        use_selenium: false,
        job_name: 'JS Nightwatch [ alpine | 18 | version: latest@ ]'
    }])
console.log(variations)
module.exports = {
    "include": variations
}
