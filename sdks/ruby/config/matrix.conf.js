const common = {
    "work_dir": "sdks/ruby",
    "framework_gem": "selenium-webdriver",
    "test_runner": "ruby",
    eyes_gem: "eyes_selenium"
}
const basic = {
    "version": "latest@",
    "ruby-version": "3.2",
    ...common
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
const containers = [
    // Alpine can't install native ruby gem dependencies
    // https://github.com/applitools/applitools_support_matrix/actions/runs/4950873182/jobs/8855069590
    // {
    // ...common,
    // os: "ubuntu-latest",
    // "version": "latest@",
    // use_selenium: true,
    // use_container: true,
    // container: 'artem0tranduil/alpine_runner:latest',
    // container_name: 'alpine',
    // job_name: `Ruby Selenium [alpine | 3+ | client version: latest@]`
    // },
    {
    ...common,
    os: "ubuntu-latest",
    "version": "latest@",
    use_selenium: true,
    use_container: true,
    container: 'artem0tranduil/debian_ruby_runner:latest',
    container_name: 'debian',
    job_name: `Ruby Selenium [debian | 3+ | client version: latest@]`
    },
]
const base_common = base_variations.map(variant => ({...basic, ...variant,}))
const appium_common = base_common.map(variant => ({...variant, gh_environment: 'appium_latest'})).concat([
    {...common, "ruby-version": "3.2", os: 'ubuntu-latest', version: 'previous@1', gh_environment: 'appium_latest'},
    {...common, "ruby-version": "3.2", os: 'ubuntu-latest', version: 'latest@', gh_environment: 'appium_previous'},
    {...common, "ruby-version": "3.2", os: 'ubuntu-latest', version: 'previous@1', gh_environment: 'appium_previous'},
])
const variations = base_common
    .map((variant) => ({
        ...variant,
        use_selenium: true,
        test_command: "bundle exec rake -v",
        job_name: `Ruby Selenium [${variant.os} | ${variant["ruby-version"]} | client version: ${variant.version}] `
    }))
    .concat([
        {
            os: "ubuntu-latest",
            use_selenium: true,
            test_command: "bundle exec rake -v",
            version: "exact@4.1.0",
            "ruby-version": "2.6",
            job_name: `Ruby Selenium [ ubuntu-latest | 2.6 | client version: 4.1.0]`,
            ...common,
        },
        {
            os: "ubuntu-latest",
            use_selenium: true,
            test_command: "bundle exec rake -v",
            version: "exact@4.9.0",
            "ruby-version": "2.7",
            job_name: `Ruby Selenium [ ubuntu-latest | 2.7 | client version: 4.9.0]`,
            ...common,
        },
        {
            os: "windows-latest",
            use_selenium: true,
            test_command: "bundle exec rake -v",
            version: "exact@4.9.0",
            "ruby-version": "2.7",
            job_name: `Ruby Selenium [ ubuntu-latest | 2.7 | client version: 4.9.0]`,
            ...common,
        },
        {
            os: "macos-latest",
            use_selenium: true,
            test_command: "bundle exec rake -v",
            version: "exact@4.9.0",
            "ruby-version": "2.7",
            job_name: `Ruby Selenium [ ubuntu-latest | 2.7 | client version: 4.9.0]`,
            ...common,
        },

    ])
    .concat([{
        os: "ubuntu-latest",
        use_selenium: true,
        test_command: "bundle exec rake -v",
        version: "exact@4.1.0",
        "ruby-version": "2.6",
        job_name: `Ruby Selenium [ ubuntu-latest | 2.6 | client version: 4.1.0]`,
        ...common,
    }])
    .concat(containers)
    .concat(appium_common.map(variant => ({
        ...variant,
        test_command: "bundle exec rake github:appium -v",
        eyes_gem: "eyes_appium",
        use_appium: true,
        framework_gem: "appium_lib",
        job_name: `Ruby Appium [${variant.os} | ${variant["ruby-version"]} | client version: ${variant.version} | ${variant.gh_environment}] `
    })))
console.log(variations)
module.exports = {
    "include": variations
}
