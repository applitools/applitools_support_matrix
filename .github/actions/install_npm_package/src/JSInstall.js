const {shellCommand} = require("../../util/common");
const path = require("node:path")
const fs = require("node:fs")

    function install({source, version, packageName, legacyNpmPeers, cwd, subPackages}) {
        switch (source) {
            case "remote":
                return remote({version, packageName, legacyNpmPeers, cwd, subPackages})
            default:
                throw new Error(`Installer doesn't support installation from ${source}`)
        }
    }

    function remote({version, packageName, legacyNpmPeers, cwd, subPackages}) {
        const packageJson = readPackageJson({cwd})
        console.log(cwd)
        console.log(packageJson)
        packageJson.dependencies[packageName] = version
        if(subPackages) {
            const arr = parseSubPackages(subPackages)
            arr.forEach(subPackageName => {
                packageJson.dependencies[subPackageName] = version
            })
        }
        savePackageJson({json:packageJson, cwd})
        let command = `npm install`
        if (legacyNpmPeers) command += ' --legacy-peer-deps'
        shellCommand(command, cwd)
        const ls = shellCommand(`npm list`, cwd)
        const regResult = new RegExp(` (${packageName})@(.*)`).exec(ls)
        return {installed_name: regResult[1], installed_version: regResult[2]}
    }

    function savePackageJson({json, cwd}) {
        const filePath = getPackageJsonPath(cwd)
        fs.writeFileSync(filePath, JSON.stringify(json), 'utf8')
    }

    function readPackageJson({cwd}) {
        const filePath = getPackageJsonPath(cwd)
        return require(filePath)
    }

    function getPackageJsonPath(cwd) {
        return path.join(cwd, 'package.json')
    }

    function parseSubPackages(subPackages) {
        return subPackages.split(',')
    }

module.exports = install

