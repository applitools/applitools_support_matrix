const path = require('path')
const JSParser = require("./src/JSParser");
const install = require("./src/JSInstall")

const packageName = "webdriverio";
const dir = "";
const cwd = path.join(process.cwd(), dir)
const parser = new JSParser();
const inputVersion = "previous@1"
const{source, version} = parser.parseInputVersion({version:inputVersion, packageName, cwd})
console.log(version)
console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
console.log(`Dir: ${dir} | type: ${typeof dir}`)
console.log(cwd)
// console.log(parser.getAllVersions(packageName, cwd))
const packageJson = require(path.join(cwd, 'package.json'))
console.log(packageJson)
install({source, version, packageName, cwd, legacyNpmPeers: false})








