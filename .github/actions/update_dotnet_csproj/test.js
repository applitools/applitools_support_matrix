const DotnetParser = require("./src/DotnetParser");
const install = require("./src/DotnetInstall");



(async () => {
    const packageName = "Eyes.Selenium4"
    const cwd = process.cwd()
    const parser = new DotnetParser();
    await parser.collect_data(packageName);
    console.log(`Package data was collected for: ${packageName}`)
    const inputVersion = "latest@"
    const {source, version} = parser.parseInputVersion({version: inputVersion, packageName, cwd})
    console.log(version);
    console.log(`Package name: ${JSON.stringify(packageName)} | type: ${typeof packageName}`)
    console.log(cwd)
    install({source, version, packageName, cwd})
})()




