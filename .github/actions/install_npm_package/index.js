const core = require('@actions/core')
const path = require('path')
const JSParser = require("./src/JSParser");
const install = require("./src/JSInstall");


;(async () => {
    try {
        const packageName = core.getInput('package');
        const dir = core.getInput('working-directory');
        const cwd = path.join(process.cwd(), dir)
        const parser = new JSParser();
        const inputVersion = core.getInput("version")
        const legacyNpmPeers = core.getInput("legacy_npm_peers")
        const {source, version} = parser.parseInputVersion({version:inputVersion, packageName, cwd})
        console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
        console.log(`Dir: ${dir} | type: ${typeof dir}`)
        console.log(version)
        console.log(cwd)
        const {installed_name, installed_version} = await install({source, version, packageName, legacyNpmPeers, cwd});
        const time = (new Date()).toTimeString();
        core.setOutput("time", time);
        core.setOutput("package_version", installed_version)
        core.setOutput("package_name" , installed_name)
    } catch (error) {
        console.log(error)
        console.log(error.stack)
        core.setFailed(error.message);
    }
})()




