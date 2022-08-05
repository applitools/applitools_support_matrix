'use strict'
import {execSync} from 'child_process'

class Version {
    constructor({major, minor, patch}) {
        this.major = strToNum(major);
        this.minor = strToNum(minor);
        this.patch = strToNum(patch);
    }

    compare(another) {
        let result = compareNums(this.major, another.major)
        if (result === 0) result = compareNums(this.minor, another.minor)
        if (result === 0) result = compareNums(this.patch, another.patch)
        return result

        function compareNums(a, b) {
            if (a > b) return -1
            else if (a < b) return 1
            else return 0
        }
    }

    toString() {
        return `${this.major}.${this.minor}.${this.patch}`
    }

}

function parseVersion(versionString) {
    const reg_version_parse = /(\d+).(\d+).(\d+)/gm
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

function checkInput(str) {
    return str && str.length > 0 ? strToNum(str) : str;
}

function strToNum(str) {
    const parsed = parseInt(str)
    if (isNaN(parsed)) {
        throw new Error(`Tried to parse string [${str}] to the num`)
    }
    return parsed
}

function shellCommand(command, cwd) {
    return execSync(command, {cwd}).toString();
}

function getLatest(packageName, cwd) {
    return parseVersion(shellCommand(`npm show ${packageName} version`, cwd))
}

function getAllVersions(packageName, cwd) {
    const commandRes = shellCommand(`npm show ${packageName} versions`, cwd);
    const reg_versions = /'\d+.\d+.\d+'/gm;
    return commandRes.match(reg_versions).map(parseVersion).sort((a, b) => a.compare(b));
}

function getMajorMinus({packageName, cwd, minus}) {
    const latest = getLatest(packageName, cwd);
    const newMajor = latest.major + minus;
    if (newMajor < 0) throw new Error(`Package [${packageName}] latest version is [${latest.toString()}] there a no major version as ${newMajor}`)
    const all = getAllVersions(packageName, cwd);
    return all.filter(ver => ver.major === newMajor)
        .sort((a, b) => a.compare(b))[0]
}

function getMinorMinus({packageName, cwd, minus}) {
    const latest = getLatest(packageName, cwd);
    const newMinor = latest.minor + minus;
    if (newMinor < 0) throw new Error(`Package [${packageName}] latest version is [${latest.toString()}] there a no minor version as ${newMinor}`)
    const all = getAllVersions(packageName, cwd);
    return all
        .filter(ver => ver.major === latest.major)
        .filter(ver => ver.minor === newMinor)
        .sort((a, b) => a.compare(b))[0]
}

function getPatchMinus({packageName, cwd, minus}) {
    const latest = getLatest(packageName, cwd);
    const newPatch = latest.patch + minus;
    if (newPatch < 0) throw new Error(`Package [${packageName}] latest version is [${latest.toString()}] there a no patch version as ${newPatch}`)
    const all = getAllVersions(packageName, cwd);
    return all
        .filter(ver => ver.major === latest.major)
        .filter(ver => ver.minor === latest.minor)
        .filter(ver => ver.patch === newPatch)[0]
}

export {
    Version,
    parseVersion,
    checkInput,
    shellCommand,
    getLatest,
    getAllVersions,
    getMajorMinus,
    getMinorMinus,
    getPatchMinus,
}