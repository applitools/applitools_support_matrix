const common = {
    "java-version": "8",
    "work_dir": "sdks/java",
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
const variations = base_common.map((variant) => ({...variant, use_selenium: true, test_command: "mvn test"}))
    .concat(base_common.map(variant => ({...variant, test_command: "mvn test -DsuiteFile=appium.xml"})))
    .map(variant => ({...variant, job_name:`Java ${variant.use_selenium ? 'Selenium' : 'Appium'} [${variant.os}]`}))
console.log(variations)
module.exports = {
    "include": variations
}
