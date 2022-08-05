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
    return str? strToNum(str) : str;
}

function strToNum(str) {
    const parsed = parseInt(str)
    if (isNaN(parsed)) {
        throw new Error(`Tried to parse string [${str}] to the num`)
    }
    return parsed
}

function shellCommand(command, cwd) {
    return  execSync(command, {cwd}).toString();
}

function getLatest(packageName, cwd) {
    return parseVersion(shellCommand(`npm show ${packageName} version`, cwd))
}

function getAllVersions(packageName, cwd) {
    const commandRes = shellCommand(`npm show ${packageName} versions`, cwd);
    const reg_versions = /'\d+.\d+.\d+'/gm;
    return commandRes.match(reg_versions).map(parseVersion).sort((a,b) => a.compare(b));
}

export {
    Version,
    parseVersion,
    checkInput,
    shellCommand,
    getLatest,
    getAllVersions,
}