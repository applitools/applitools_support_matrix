'use strict'
const {getOS} = require('../../../matrix/util')

const common = {
    "node-version": "16",
    "framework_package": "storybook",
    "test_runner": "js",
    "eyes_package": "@applitools/eyes-storybook",
    test_command: "npm test"
}
const base_variations = [
    {
        "work_dir": "sdks/js/eyes-storybook/latest",
        "os": "ubuntu-latest",
        "version": "latest@",
        "branch": "latest-story"
    },
    {
        "work_dir": "sdks/js/eyes-storybook/latest",
        "os": "ubuntu-latest",
        "version": "exact@future",
        "branch": "latest-story"
    },
    // {
    //     "work_dir": "sdks/js/eyes-storybook/latest",
    //     "os": "windows-latest",
    //     "version": "latest@",
    //     "branch": "latest-story"
    // },
    {
        "work_dir": "sdks/js/eyes-storybook/latest",
        "os": "macos-latest",
        "version": "latest@",
        "branch": "latest-story"
    },
    {
        "work_dir": "sdks/js/eyes-storybook/major_6",
        "os": "ubuntu-latest",
        "version": "major@1",
        "framework_package": "@storybook/react",
        "branch": "minus-story"
    },
    {
        "work_dir": "sdks/js/eyes-storybook/major_6",
        "os": "macos-latest",
        "version": "major@1",
        "framework_package": "@storybook/react",
        "branch": "minus-story"
    },
    {
        "work_dir": "sdks/js/eyes-storybook/major_6",
        "os": "windows-latest",
        "version": "major@1",
        "branch": "minus-story"
    },

    // Containers variations
    {
        "work_dir": "sdks/js/eyes-storybook/latest",
        "os": "ubuntu-latest",
        "version": "latest@",
        "branch": "latest-story",
        use_container: true,
        container: 'artem0tranduil/alpine_runner:latest',
        container_name: 'alpine',
    },
    {
        "work_dir": "sdks/js/eyes-storybook/latest",
        "os": "ubuntu-latest",
        "version": "latest@",
        "branch": "latest-story",
        use_container: true,
        container: 'artem0tranduil/debian_runner:latest',
        container_name: 'debian',
    },

]
const variations = base_variations.map(variant => ({...common, ...variant,
    job_name:`JS Storybook [${getOS(variant)} | ${common["node-version"]}] version: ${variant.version}`
}))
console.log(variations)
module.exports = {
    "include": variations
}
