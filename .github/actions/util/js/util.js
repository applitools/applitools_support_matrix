'use strict'
import {execSync} from 'child_process'
import {parseVersion} from '../common'

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
    parseVersion,
    shellCommand,
    getLatest,
    getAllVersions,
    getMajorMinus,
    getMinorMinus,
    getPatchMinus,
}