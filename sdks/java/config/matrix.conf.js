const common = {
    "java-version": "8",
    test_command: "mvn test",
}
const base_variations = [
    {
        "os": "ubuntu-latest",
    },
    {
        "os": "windows-latest",
    },
    {
        "os": "macos-latest",
    }
]
const base_common = base_variations.map(variant => ({...common, ...variant,}))
const variations = base_common.map((variant) => ({...variant, use_selenium: true, work_dir: "sdks/java/selenium",}))
    .concat(base_common.map(variant => ({...variant, work_dir: "sdks/java/appium"})))
    .map(variant => ({...variant, job_name:`Java ${variant.use_selenium ? 'Selenium' : 'Appium'} [${variant.os}]`}))
console.log(variations)
module.exports = {
    "include": variations
}
