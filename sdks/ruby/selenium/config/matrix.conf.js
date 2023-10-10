'use strict';
const {base_common, containers, common} = require("../../config/ruby_common")
const selenium = {
    use_selenium: true,
    test_command: "bundle exec rake -v",
    work_dir: "sdks/ruby/selenium",
}

const variations = base_common
    .map((variant) => ({
        ...variant,
        ...selenium,
        job_name: `Ruby Selenium [${variant.os} | ${variant["ruby-version"]} | client version: ${variant.version}] `
    }))
    .concat([
        {
            os: "ubuntu-latest",
            version: "exact@4.1.0",
            "ruby-version": "2.6",
            job_name: `Ruby Selenium [ ubuntu-latest | 2.6 | client version: 4.1.0]`,
            ...common,
            ...selenium,
        },
        {
            os: "ubuntu-latest",
            version: "exact@4.9.0",
            "ruby-version": "2.7",
            job_name: `Ruby Selenium [ ubuntu-latest | 2.7 | client version: 4.9.0]`,
            ...common,
            ...selenium,
        },
        {
            os: "windows-latest",
            version: "exact@4.9.0",
            "ruby-version": "2.7",
            job_name: `Ruby Selenium [ ubuntu-latest | 2.7 | client version: 4.9.0]`,
            ...common,
            ...selenium,
        },
        {
            os: "macos-latest",
            version: "exact@4.9.0",
            "ruby-version": "2.7",
            job_name: `Ruby Selenium [ ubuntu-latest | 2.7 | client version: 4.9.0]`,
            ...common,
            ...selenium,
        },
        {
            os: "ubuntu-latest",
            selenium_legacy: true,
            version: "exact@4.1.0",
            "ruby-version": "2.6",
            job_name: `Ruby Selenium [ ubuntu-latest | 2.6 | client version: 4.1.0]`,
            ...common,
            ...selenium,
        }
    ])
    .concat(containers)
console.log(variations)
module.exports = {
    "include": variations
}
