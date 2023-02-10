const common = {
    "ruby-version": "2.6",
    "work_dir": "sdks/ruby"
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
const variations = base_common
    .map((variant) => ({...variant,
        use_selenium: true,
        test_command: "bundle exec rake"
    }))
    .concat(base_common.map(variant => ({...variant,
        test_command: "bundle exec rake github:appium"
    })))
    .map(variant => ({...variant, job_name:`Ruby ${variant.use_selenium ? 'Selenium' : 'Appium'} [${variant.os}]`}))
console.log(variations)
module.exports = {
    "include": variations
}
