const path = require('path')
const JSParser = require("./src/JSParser");

const packageName = "webdriverio";
const dir = "";
const cwd = path.join(process.cwd(), dir)
let version;
const parser = new JSParser();
version = "previous@1"
version = parser.parseInputVersion({version, packageName, cwd})
console.log(version)
console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
console.log(`Dir: ${dir} | type: ${typeof dir}`)
console.log(cwd)
// console.log(parser.getAllVersions(packageName, cwd))
const packageJson = require(path.join(cwd, 'package.json'))
console.log(packageJson)








