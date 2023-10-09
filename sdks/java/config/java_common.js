const common = {
    "java-version": "11",
    test_command: "mvn test",
    "test_runner": "java"
}
const base_variations = [
    {
        "os": "ubuntu-latest",
        version: "latest@"
    },
    {
        "os": "ubuntu-latest",
        "java-version": "8",
        version: "latest@"
    },
    {
        "os": "ubuntu-latest",
        "java-version": "17",
        version: "latest@"
    },
    {
        "os": "ubuntu-latest",
        "java-version": "20",
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
const alpine = {
    use_container: true,
    container_name: 'alpine',
    container: 'artem0tranduil/alpine_runner:latest',
}

const debian = {
    use_container: true,
    "java-version": "17",
    container_name: 'debian',
    container: 'artem0tranduil/debian_runner:latest',
}
const selenium_package = {
    work_dir: "sdks/java/selenium",
    framework_package: {
        groupId: 'org.seleniumhq.selenium',
        artifactId: 'selenium-java'
    },
    eyes_package: {
        groupId: 'com.applitools',
        artifactId: 'eyes-selenium-java5'
    },
}
const playwright_package = {
    work_dir: "sdks/java/playwright",
    framework_package: {
        groupId: 'com.microsoft.playwright',
        artifactId: 'playwright'
    },
    eyes_package: {
        groupId: 'com.applitools',
        artifactId: 'eyes-playwright-java5'
    },
}

const appium_package = {
    work_dir: "sdks/java/appium",
    framework_package: {
        groupId: 'io.appium',
        artifactId: 'java-client'
    },
    eyes_package: {
        groupId: 'com.applitools',
        artifactId: 'eyes-appium-java5'
    },
}
const base_common = base_variations.map(variant => ({...common, ...variant,}))

module.exports = {
    common,
    base_variations,
    appium_package,
    selenium_package,
    playwright_package,
    alpine,
    debian,
    base_common
}