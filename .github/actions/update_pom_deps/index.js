const core = require('@actions/core')
const path = require('path')
const JavaParser = require("./src/JavaParser");
const fs = require("fs");

(async () => {
    try {
        const packageName = core.getInput('package');
        const dir = core.getInput('working-directory');
        const cwd = path.join(process.cwd(), dir)
        const parser = new JavaParser();
        await parser.collect_data(packageName);
        console.log(`Package data was collected for: ${packageName}`)
        let version;
        version = core.getInput("version")
        version = parser.parseInputVersion({version, packageName, cwd})
        console.log(version);
        console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
        console.log(`Dir: ${dir} | type: ${typeof dir}`)
        console.log(cwd)
        const pomPath = path.join(cwd, "pom.xml")
        let pom = fs.readFileSync(pomPath).toString()
        const reg = new RegExp(`^${packageName}[=>~]{0,2}[\\d\.\*]*$`, 'gm')
        const newPackageLine = `${packageName}==${version}`
        if (reg.test(pom)) {
            pom = pom.replace(reg, newPackageLine)
        } else {
            pom = pom.concat(`\n${newPackageLine}`)
        }
        fs.writeFileSync(pomPath, pom)
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




