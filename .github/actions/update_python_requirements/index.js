const core = require('@actions/core')
const path = require('path')
const PythonParser = require("./src/PythonParser");
const fs = require("fs");

(async () => {
    try {
        const packageName = core.getInput('package');
        const dir = core.getInput('working-directory');
        const cwd = path.join(process.cwd(), dir)
        const parser = new PythonParser();
        await parser.collect_data(packageName);
        console.log(`Package data was collected for: ${packageName}`)
        let version;
        version = core.getInput("version")
        version = parser.parseInputVersion({version, packageName, cwd})
        console.log(version);
        console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
        console.log(`Dir: ${dir} | type: ${typeof dir}`)
        console.log(cwd)
        const requirementsPath = path.join(cwd, "requirements.txt")
        let requirements = fs.readFileSync(requirementsPath).toString()
        const reg = new RegExp(`^${packageName}[=>~]{0,2}[\\d\.\*]*$`, 'gm')
        const newPackageLine = `${packageName}==${version}`
        if (reg.test(requirements)) {
            requirements = requirements.replace(reg, newPackageLine)
        } else {
            requirements = requirements.concat(`\n${newPackageLine}`)
        }
        fs.writeFileSync(requirementsPath, requirements)
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




