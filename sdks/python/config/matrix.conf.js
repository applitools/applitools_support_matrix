const common = {
    "python-version": "3.10",
    "work_dir": "sdks/python"
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
        test_command: "pytest -n 2"
    }))
    .concat(base_common.map(variant => ({...variant,
        test_command: "pytest -c appium.ini"
    })))
    .map(variant => ({...variant, job_name:`Python ${variant.use_selenium ? 'Selenium' : 'Appium'} [${variant.os}]`}))
console.log(variations)
module.exports = {
    "include": variations
}
