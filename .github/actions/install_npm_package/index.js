const core = require('@actions/core')
const path = require('path')
const JSParser = require("../util/versions/JSParser");
const {shellCommand} = require("../util/common");

try {
    const packageName = core.getInput('package');
    const dir = core.getInput('working-directory');
    const cwd = path.join(process.cwd(), dir)
    const parser = new JSParser();
    let version;
    version = core.getInput("version")
    version = parser.parseInputVersion({version, packageName, cwd})
    console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
    console.log(`Dir: ${dir} | type: ${typeof dir}`)
    console.log(cwd)
    shellCommand(`npm install ${packageName}@${version}`, cwd)
    const ls = shellCommand(`npm list`, cwd)
    const regResult = new RegExp(` (${packageName})@(.*)`).exec(ls)
    const installed_name = regResult[1];
    const installed_version = regResult[2];
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    core.setOutput("package_version", installed_version)
    core.setOutput("package_name" , installed_name)
} catch (error) {
    console.log(error)
    console.log(error.stack)
    core.setFailed(error.message);
}



