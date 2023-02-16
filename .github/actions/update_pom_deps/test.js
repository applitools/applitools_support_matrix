const path = require('path')
const fs = require('fs')
const JavaParser = require("./src/JavaParser");
const JavaInstaller = require("./src/JavaInstaller")
const testVar = new JavaInstaller();

console.log(Object.getOwnPropertyNames(testVar))
console.log(Object.values(testVar.prototype))
console.log(testVar.hasOwnProperty("remote"))
// (async() => {
//     const packageName = "com/applitools/eyes-selenium-java5";
// // const packageName = "pytest";
//     const dir = "sdks/java";
//     const action_path = '../../../'
//     const cwd = path.join(process.cwd(), action_path, dir)
//     let version;
//     const parser = new JavaParser();
//     version = "previous@1";
//     await parser.collect_data(packageName)
//     version = parser.parseInputVersion({version, packageName, cwd})
//     console.log(version)
//     console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
//     console.log(`Dir: ${dir} | type: ${typeof dir}`)
//     console.log(cwd)
//     console.log(parser.getLatest(packageName, cwd))
//
// })()




