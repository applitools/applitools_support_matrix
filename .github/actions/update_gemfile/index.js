const core = require('@actions/core')
const path = require('path')
const RubyParser = require("../util/versions/RubyParser");
const fs = require("fs");

try {
    const packageName = core.getInput('gem');
    const dir = core.getInput('working-directory');
    const cwd = path.join(process.cwd(), dir)
    const parser = new RubyParser();
    let version;
    version = core.getInput("version")
    version = parser.parseInputVersion({version, packageName, cwd})
    console.log(version);
    console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
    console.log(`Dir: ${dir} | type: ${typeof dir}`)
    console.log(cwd)
    const gemfilePath = path.join(cwd, "Gemfile")
    let gemfile = fs.readFileSync(gemfilePath).toString()
    const reg = new RegExp(`^.*${packageName}.*$`, 'gm')
    const newGemString = `gem '${packageName}', '${version}'`
    if (reg.test(gemfile)) {
        gemfile = gemfile.replace(reg, newGemString)
    } else {
        gemfile = gemfile.concat(`\ngem '${packageName}', '${version}'`)
    }
    fs.writeFileSync("Gemfile", gemfile)
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    core.setOutput("gem_version", version.toString())
    core.setOutput("gem_name" , packageName)
} catch (error) {
    console.log(error)
    console.log(error.stack)
    core.setFailed(error.message);
}



