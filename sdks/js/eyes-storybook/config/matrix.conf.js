const common = {
    "node-version": "18",
    "work_dir": "sdks/js/eyes-storybook",
    "framework_package": "@storybook/react",
    test_command: "npm test"
}
const base_variations = [
    {
        "os": "ubuntu-latest",
        "version": "latest@",
        "branch": "latest-story"
    },
    {
        "os": "ubuntu-latest",
        "version": "major@1",
        "branch": "minus-story"
    },
    {
        "os": "windows-latest",
        "version": "latest@",
        "branch": "latest-story"
    },
    {
        "os": "macos-latest",
        "version": "latest@",
        "branch": "latest-story"
    }
]
const variations = base_variations.map(variant => ({...common, ...variant, job_name:`JS Storybook [${variant.os} | ${variant.version}]`}))
console.log(variations)
module.exports = {
    "include": variations
}