const path = require('path')
const JSParser = require("../util/versions/JSParser");

const packageName = "webdriverio";
const dir = "sdks/js/eyes-cypress/v10";
const cwd = path.join(process.cwd(), dir)
let version;
const parser = new JSParser();
version = "previous@1"
version = parser.parseInputVersion({version, packageName, cwd})
console.log(version)
console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
console.log(`Dir: ${dir} | type: ${typeof dir}`)
console.log(cwd)
console.log(parser.getAllVersions(packageName, cwd))




