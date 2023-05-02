const common = {
    "node-version": "16",
    "framework_package": "@storybook/react",
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
    {
        "work_dir": "sdks/js/eyes-storybook/latest",
        "os": "windows-latest",
        "version": "latest@",
        "branch": "latest-story"
    },
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
        "branch": "minus-story"
    },
    {
        "work_dir": "sdks/js/eyes-storybook/major_6",
        "os": "macos-latest",
        "version": "major@1",
        "branch": "minus-story"
    },
    {
        "work_dir": "sdks/js/eyes-storybook/major_6",
        "os": "windows-latest",
        "version": "major@1",
        "branch": "minus-story"
    },
]
const variations = base_variations.map(variant => ({...common, ...variant,
    job_name:`JS Storybook [${variant.os} | ${common["node-version"]}] version: ${variant.version}`
}))
console.log(variations)
module.exports = {
    "include": variations
}