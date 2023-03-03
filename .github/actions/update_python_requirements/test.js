const path = require('path')
const fs = require('fs')
const PythonParser = require("./src/PythonParser");
const core = require("@actions/core");
const install = require("./src/PythonInstall");


(async() => {
    const packageName = "eyes_selenium";
    const cwd = path.join(process.cwd())
    const inputVersion = "package@5.15.1.test"
    const parser = new PythonParser();
    await parser.collect_data(packageName);
    console.log(`Package data was collected for: ${packageName}`)
    console.log(`Input version string: ${inputVersion}`)
    const {source, version} = parser.parseInputVersion({version:inputVersion, packageName, cwd})
    console.log(`Parsed version: ${version}`);
    console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
    console.log(cwd)
    // await install({source,version,packageName,cwd})
})()




