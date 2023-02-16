const core = require('@actions/core')
const path = require('path')
const JavaParser = require("./src/JavaParser");
const install = require("./src/JavaInstall");

(async () => {
    try {
        const packageName = {
            groupId: core.getInput('groupId'),
            artifactId: core.getInput('artifactId')
        }
        const dir = core.getInput('working-directory');
        const cwd = path.join(process.cwd(), dir)
        const parser = new JavaParser();
        await parser.collect_data(packageName);
        console.log(`Package data was collected for: ${packageName}`)
        const inputVersion = core.getInput("version")
        const {source, version} = parser.parseInputVersion({version:inputVersion, packageName, cwd})
        console.log(version);
        console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
        console.log(`Dir: ${dir} | type: ${typeof dir}`)
        console.log(cwd)
        install({source,version, packageName, cwd})
        const time = (new Date()).toTimeString();
        core.setOutput("time", time);
        core.setOutput("package_version", version.toString())
        core.setOutput("package_name", packageName)
    } catch (error) {
        console.log(error)
        console.log(error.stack)
        core.setFailed(error.message);
    }
})()




