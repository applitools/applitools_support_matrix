const common = {
    "java-version": "8",
    test_command: "mvn test",
    "test_runner": "java"
}
const base_variations = [
    {
        "os": "ubuntu-latest",
        version: "latest@"
    },
    {
        "os": "windows-latest",
        version: "latest@"
    },
    {
        "os": "macos-latest",
        version: "latest@"
    }
]
const base_common = base_variations.map(variant => ({...common, ...variant,}))
const appium_common = base_common.map(variant => ({...variant, gh_environment: 'appium_latest'})).concat([
    // {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_latest'},
    {...common, os:'ubuntu-latest', version:'latest@', gh_environment: 'appium_previous'},
    // {...common, os:'ubuntu-latest', version:'previous@1', gh_environment: 'appium_previous'},
])
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
        job_name:`Java Selenium [${variant.os} | ${variant["java-version"]} | version: ${variant.version}]`
    }))
    .concat(base_common.map(variant => ({
        ...variant,
        use_selenium: false,
        framework_package:{
            groupId:'com.microsoft.playwright',
            artifactId:'playwright'
        },
        eyes_package: {
            groupId:'com.applitools',
            artifactId:'eyes-playwright-java5'
        },
        work_dir: "sdks/java/playwright",
        job_name:`Java Playwright [${variant.os} | ${variant["java-version"]} | version: ${variant.version}]`
    })))
    .concat(appium_common.map(variant => ({
        ...variant,
        framework_package:{
            groupId:'io.appium',
            artifactId:'java-client'
        },
        eyes_package: {
            groupId:'com.applitools',
            artifactId:'eyes-appium-java5'
        },
        work_dir: "sdks/java/appium",
        isAppium: true,
        job_name:`Java Appium [${variant.os} | ${variant["java-version"]} | client version: ${variant.version} | ${variant.gh_environment}] `
    })))
console.log(variations)
module.exports = {
    "include": variations
}
