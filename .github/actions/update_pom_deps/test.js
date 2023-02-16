
const JavaParser = require("./src/JavaParser");
const install = require("./src/JavaInstall");

(async () => {
    const packageName = {
        groupId: 'io.appium',
        artifactId: 'java-client'
    };
    const cwd = process.cwd()
    const parser = new JavaParser();
    await parser.collect_data(packageName);
    console.log(`Package data was collected for: ${packageName}`)
    const inputVersion = "major@1"
    const {source, version} = parser.parseInputVersion({version: inputVersion, packageName, cwd})
    console.log(version);
    console.log(`Package name: ${JSON.stringify(packageName)} | type: ${typeof packageName}`)
    console.log(cwd)
    install({source, version, packageName, cwd})
})()




