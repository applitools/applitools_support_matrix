const {base_common, alpine, debian, selenium_package, common} = require("../../config/java_common")
const variations = base_common
    .filter(variant => variant["java-version"]!=="8")
    .map((variant) => ({
        ...variant,
        ...selenium_package,
        use_selenium: true,
        job_name: `Java Selenium [${variant.os} | ${variant["java-version"]} | version: ${variant.version}]`
    }))
    .concat([
        {
            os: "ubuntu-latest",
            version: "latest@",
            use_selenium: true,
            ...common,
            ...alpine,
            ...selenium_package,
            job_name: `Java Selenium [alpine | 11 | latest@]`
        },
        {
            os: "ubuntu-latest",
            version: "latest@",
            use_selenium: true,
            ...common,
            ...debian,
            ...selenium_package,
            job_name: `Java Selenium [debian | 17 | latest@]`
        },
    ])
console.log(variations)
module.exports = {
    "include": variations
}
