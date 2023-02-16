const core = require('@actions/core')
const path = require('path')
const RubyParser = require("./src/RubyParser");
const install = require("./src/RubyInstall")

try {
    const packageName = core.getInput('gem');
    const dir = core.getInput('working-directory');
    const cwd = path.join(process.cwd(), dir)
    const parser = new RubyParser();
    const inputVersion = core.getInput("version")
    const {source, version} = parser.parseInputVersion({version:inputVersion, packageName, cwd})
    console.log(version);
    console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
    console.log(`Dir: ${dir} | type: ${typeof dir}`)
    console.log(cwd)
    install({source, version, packageName, cwd})
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    core.setOutput("gem_version", version.toString())
    core.setOutput("gem_name" , packageName)
} catch (error) {
    console.log(error)
    console.log(error.stack)
    core.setFailed(error.message);
}



