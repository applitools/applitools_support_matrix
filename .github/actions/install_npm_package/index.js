import * as core from '@actions/core'
import path from 'path'
import {checkInput, shellCommand, getLatest, getPatchMinus, getMinorMinus, getMajorMinus} from "../util/js/util";

try {
    const packageName = core.getInput('package');
    const dir = core.getInput('working-directory');
    const cwd = path.join(process.cwd(), dir)
    let major, minor, patch, version;
    major = checkInput(core.getInput('major'));
    minor = checkInput(core.getInput('minor'));
    patch = checkInput(core.getInput('patch'));
    const exact = core.getInput("exact")
    if (exact.length > 0) {
        version = exact;
    } else if(major) {
        version = getMajorMinus({packageName, cwd, minus: major}).toString()
    } else if (minor) {
        version = getMinorMinus({packageName, cwd, minus: minor}).toString()
    } else if (patch) {
        version = getPatchMinus({packageName, cwd, minus: patch}).toString()
    } else {
        version = getLatest(packageName, cwd).toString()
    }

    console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
    console.log(`Major: ${major} | type: ${typeof major}`)
    console.log(`Minor: ${minor} | type: ${typeof minor}`)
    console.log(`Patch: ${patch} | type: ${typeof patch}`)
    console.log(`Dir: ${dir} | type: ${typeof dir}`)
    console.log(cwd)
    shellCommand(`npm install ${packageName}@${version}`, cwd)
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    core.setOutput("package_version", version)
} catch (error) {
    core.setFailed(error.message);
}



