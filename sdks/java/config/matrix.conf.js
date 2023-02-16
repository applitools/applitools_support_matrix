const common = {
    "java-version": "8",
    test_command: "mvn test",
}
const base_variations = [
    {
        "os": "ubuntu-latest",
        version: "latest@"
    },
    // {
    //     "os": "windows-latest",
    //     version: "latest@"
    // },
    // {
    //     "os": "macos-latest",
    //     version: "latest@"
    // }
]
const base_common = base_variations.map(variant => ({...common, ...variant,}))
const variations = base_common
    .map((variant) => ({
        ...variant,
        use_selenium: true,
        framework_package:{
            groupId:'org.seleniumhq.selenium',
            artifactId:'selenium-java'
        },
        eyes_package: {
            groupId:'com.applitools',
            artifactId:'eyes-selenium-java5'
        },
        work_dir: "sdks/java/selenium",
    }))
    .concat(base_common.map(variant => ({
        ...variant,
        framework_package:{
            groupId:'io.appium',
            artifactId:'java-client'
        },
        eyes_package: {
            groupId:'com.applitools',
            artifactId:'eyes-appium-java5'
        },
        work_dir: "sdks/java/appium"
    })))
    .map(variant => ({...variant, job_name:`Java ${variant.use_selenium ? 'Selenium' : 'Appium'} [${variant.os}]`}))
console.log(variations)
module.exports = {
    "include": variations
}
