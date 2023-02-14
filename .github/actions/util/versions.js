'use strict'
const {strToNum, shellCommand} = require('./common')
const Version = require("./Version");

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
    let change = strToNum(minus);
    if (change > 0) change = change * -1;
    const newMajor = latest.major + change;
    if (newMajor < 0) throw new Error(`Package [${packageName}] latest version is [${latest.toString()}] there a no major version as ${newMajor}`)
    const all = getAllVersions(packageName, cwd);
    return all.filter(ver => ver.major === newMajor)
        .sort((a, b) => a.compare(b))[0]
}

function getMinorMinus({packageName, cwd, minus}) {
    const latest = getLatest(packageName, cwd);
    let change = strToNum(minus);
    if (change > 0) change = change * -1;
    const newMinor = latest.minor + change;
    if (newMinor < 0) throw new Error(`Package [${packageName}] latest version is [${latest.toString()}] there a no minor version as ${newMinor}`)
    const all = getAllVersions(packageName, cwd);
    return all
        .filter(ver => ver.major === latest.major)
        .filter(ver => ver.minor === newMinor)
        .sort((a, b) => a.compare(b))[0]
}

function getPatchMinus({packageName, cwd, minus}) {
    const latest = getLatest(packageName, cwd);
    let change = strToNum(minus);
    if (change > 0) change = change * -1;
    const newPatch = latest.patch + change;
    if (newPatch < 0) throw new Error(`Package [${packageName}] latest version is [${latest.toString()}] there a no patch version as ${newPatch}`)
    const all = getAllVersions(packageName, cwd);
    return all
        .filter(ver => ver.major === latest.major)
        .filter(ver => ver.minor === latest.minor)
        .filter(ver => ver.patch === newPatch)[0]
}


function parseInputVersion({version, packageName, cwd}) {
    const TYPES = {
        exact: ({minus})=> {
            return minus
        },
        major: getMajorMinus,
        minor: getMinorMinus,
        patch: getPatchMinus,
        latest: ({packageName, cwd}) => {
            return getLatest(packageName, cwd)
        },
    }
    const arr = getCheck(version)
    const type = arr[1];
    const value = arr[2];

    if (!TYPES.hasOwnProperty(type)) throw new Error(`There were wrong input type, ${JSON.stringify(arr)}`)
    return TYPES[type]({packageName, cwd, minus:value})


    function getCheck(str) {
        const regex = /(\w+)@(.*)/gm
        return regex.exec(str)
    }


}

module.exports = {
    getLatest,
    getAllVersions,
    getMajorMinus,
    getMinorMinus,
    getPatchMinus,
    parseInputVersion
}