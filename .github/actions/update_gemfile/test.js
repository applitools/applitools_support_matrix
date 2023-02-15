const path = require('path')
const fs = require('fs')
const JSParser = require("../util/versions/RubyParser");

const packageName = "selenium-webdriver";
const dir = "sdks/ruby";
const action_path = '../../../'
const cwd = path.join(process.cwd(), action_path, dir)
let version;
const parser = new JSParser();
version = "major@1"
version = parser.parseInputVersion({version, packageName, cwd})
console.log(version)
console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
console.log(`Dir: ${dir} | type: ${typeof dir}`)
console.log(cwd)
console.log(parser.getLatest(packageName, cwd))

let gemfile = fs.readFileSync("Gemfile").toString()
const reg = new RegExp(`^.*${packageName}.*$`, 'gm')
const newGemString = `gem '${packageName}', '${version}'`
if (reg.test(gemfile)) {
    gemfile = gemfile.replace(reg, newGemString)
} else {
    gemfile = gemfile.concat(`\ngem '${packageName}', '${version}'`)
}
fs.writeFileSync("Gemfile", gemfile)


