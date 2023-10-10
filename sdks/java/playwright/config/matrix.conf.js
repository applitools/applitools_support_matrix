const {base_common, playwright_package, alpine, debian, common} = require("../../config/java_common")

const variations = base_common.map(variant => ({
        ...variant,
        ...playwright_package,
        use_selenium: false,
        job_name: `Java Playwright [${variant.os} | ${variant["java-version"]} | version: ${variant.version}]`
    }))
    .concat([
        {
            os: "ubuntu-latest",
            version: "latest@",
            ...common,
            ...alpine,
            ...playwright_package,
            job_name: `Java Playwright [alpine | 8 | latest@]`
        },
        {
            os: "ubuntu-latest",
            version: "latest@",
            ...common,
            ...debian,
            ...playwright_package,
            job_name: `Java Playwright [debian | 8 | latest@]`
        },
    ])
console.log(variations)
module.exports = {
    "include": variations
}
