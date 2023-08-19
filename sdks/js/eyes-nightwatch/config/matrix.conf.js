const common = {
    "node-version": "18",
    "work_dir": "sdks/js/eyes-nightwatch",
    "framework_package": "nightwatch",
    "test_runner": "js",
    "eyes_package": "@applitools/eyes-nightwatch",
    use_selenium: true,
    test_command: "npm test && USE_UFG=true npm test"
}
const base_variations = [{
    "os": "ubuntu-latest", "version": "latest@",
}, {
    "os": "windows-latest", "version": "latest@",
}, {
    "os": "macos-latest", "version": "latest@",
}]
const alpine = {
    use_container: true, container: 'artem0tranduil/alpine_runner:latest', container_name: 'alpine'
}
const debian = {
    use_container: true, container: 'artem0tranduil/debian_runner:latest', container_name: 'debian'
}
const base_common = base_variations.map(variant => ({...variant, ...common,}))
const variations = base_common
    .concat([{...common, os: "ubuntu-latest", version: "exact@alpha", legacy_npm_peers: true}])
    .map(variant => ({
        ...variant, job_name: `JS Nightwatch [${variant.os} | ${common["node-version"]}] version: ${variant.version}`
    }))
    .concat([{
        ...common, ...alpine,
        os: "ubuntu-latest",
        version: "latest@",
        job_name: 'JS Nightwatch [ alpine | 18 | version: latest@ ]'
    }, {
        ...common, ...debian,
        os: "ubuntu-latest",
        version: "latest@",
        job_name: 'JS Nightwatch [ debian | 18 | version: latest@ ]'
    }])
console.log(variations)
module.exports = {
    "include": variations
}
