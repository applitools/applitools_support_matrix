'use strict'
const {execSync} = require('child_process')
const {parseVersion, strToNum} = require('../common')

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

module.exports = {
    parseVersion,
    shellCommand,
    getLatest,
    getAllVersions,
    getMajorMinus,
    getMinorMinus,
    getPatchMinus,
}