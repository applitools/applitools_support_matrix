'use strict'
const {strToNum} = require('../common')
const Version = require("./Version");


class CoreParser {

    parseVersion(versionString) {
        const reg_version_parse = /(\d+)\.(\d+)\.(\d+)/gm
        const arr = reg_version_parse.exec(versionString);
        if (arr === null) {
            console.log(versionString)
            throw new Error("failed to parse")
        }
        return new Version({
            major: arr[1],
            minor: arr[2],
            patch: arr[3],
        })
    }

    getLatest() {
        throw new Error("It's not implemented method of the core parser, something gone wrong")
    }

    getAllVersions() {
        throw new Error("It's not implemented method of the core parser, something gone wrong")
    }

    getMajorMinus({packageName, cwd, minus}) {
        const latest = this.getLatest(packageName, cwd);
        let change = strToNum(minus);
        if (change > 0) change = change * -1;
        const newMajor = latest.major + change;
        if (newMajor < 0) throw new Error(`Package [${packageName}] latest version is [${latest.toString()}] there a no major version as ${newMajor}`)
        const all = this.getAllVersions(packageName, cwd);
        return all.filter(ver => ver.major === newMajor)
            .sort((a, b) => a.compare(b))[0]
    }

    getMinorMinus({packageName, cwd, minus}) {
        const latest = this.getLatest(packageName, cwd);
        let change = strToNum(minus);
        if (change > 0) change = change * -1;
        const newMinor = latest.minor + change;
        if (newMinor < 0) throw new Error(`Package [${packageName}] latest version is [${latest.toString()}] there a no minor version as ${newMinor}`)
        const all = this.getAllVersions(packageName, cwd);
        return all
            .filter(ver => ver.major === latest.major)
            .filter(ver => ver.minor === newMinor)
            .sort((a, b) => a.compare(b))[0]
    }

    getPatchMinus({packageName, cwd, minus}) {
        const latest = this.getLatest(packageName, cwd);
        let change = strToNum(minus);
        if (change > 0) change = change * -1;
        const newPatch = latest.patch + change;
        if (newPatch < 0) throw new Error(`Package [${packageName}] latest version is [${latest.toString()}] there a no patch version as ${newPatch}`)
        const all = this.getAllVersions(packageName, cwd);
        return all
            .filter(ver => ver.major === latest.major)
            .filter(ver => ver.minor === latest.minor)
            .filter(ver => ver.patch === newPatch)[0]
    }

    getPreviousMinus({packageName, cwd, minus}) {
        let change = strToNum(minus);
        const all = this.getAllVersions(packageName, cwd);
        return all[change]
    }

    parseInputVersion({version, packageName, cwd}) {
        const regex = /(\w+)@(.*)/gm
        const arr = regex.exec(version)
        const type = arr[1];
        const value = arr[2];
        const Remotes = {
            exact: ({minus}) => {
                return minus
            },
            major: this.getMajorMinus,
            minor: this.getMinorMinus,
            patch: this.getPatchMinus,
            previous: this.getPreviousMinus,
            latest: ({packageName, cwd}) => {
                return this.getLatest(packageName, cwd)
            },
        }
        if (Remotes.hasOwnProperty(type)) {
            const calculatedVersion = Remotes[type]({packageName, cwd, minus: value})
            if (calculatedVersion === undefined) throw new Error(`The version for ${JSON.stringify(packageName)} wasn't found for change in ${type} for ${value}`)
            return {
                source: 'remote',
                version: calculatedVersion
            }
        } else return {source: type, version: value}
    }

}

module.exports = CoreParser