const path = require('path')
const fs = require('fs')
const PythonParser = require("./src/PythonParser");


(async() => {
    const packageName = "selenium";
// const packageName = "pytest";
    const dir = "sdks/python";
    const action_path = '../../../'
    const cwd = path.join(process.cwd(), action_path, dir)
    let version;
    const parser = new PythonParser();
    version = "previous@1";
    await parser.collect_data(packageName)
    version = parser.parseInputVersion({version, packageName, cwd})
    console.log(version)
    console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
    console.log(`Dir: ${dir} | type: ${typeof dir}`)
    console.log(cwd)
    console.log(parser.getLatest(packageName, cwd))

    let requirements = fs.readFileSync("requirements.txt").toString()
    const reg = new RegExp(`^${packageName}[=>~]{0,2}[\\d\.\*]*$`, 'gm')
    const newPackageLine = `${packageName}==${version}`
    if (reg.test(requirements)) {
        requirements = requirements.replace(reg, newPackageLine)
    } else {
        requirements = requirements.concat(`\n${newPackageLine}`)
    }
    fs.writeFileSync("requirements.txt", requirements)
})()




