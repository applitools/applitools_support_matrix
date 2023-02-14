const path = require('path')
const {parseInputVersion} = require("../util/versions");

const packageName = "cypress";
const dir = "sdks/js/eyes-cypress/v10";
const cwd = path.join(process.cwd(), dir)
let version;
version = "latest@"
version = parseInputVersion({version, packageName, cwd})
console.log(version)
console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
console.log(`Dir: ${dir} | type: ${typeof dir}`)
console.log(cwd)




