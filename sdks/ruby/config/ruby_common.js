'use strict';

const common = {
    "framework_gem": "selenium-webdriver",
    "test_runner": "ruby",
    test_command: "bundle exec rake -v",
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
        work_dir: "sdks/ruby/selenium",
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

module.exports = {
    common,
    basic,
    base_variations,
    base_common,
    containers
}