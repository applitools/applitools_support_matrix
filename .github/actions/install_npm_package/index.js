import * as core from '@actions/core'
import path from 'path'
import {shellCommand} from "../util/js/util";
import {checkInput, parseInputVersion} from "../util/common";

try {
    const packageName = core.getInput('package');
    const dir = core.getInput('working-directory');
    const cwd = path.join(process.cwd(), dir)
    let version;
    version = checkInput(core.getInput("version"))
    version = parseInputVersion({version, packageName, cwd})
    console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
    console.log(`Dir: ${dir} | type: ${typeof dir}`)
    console.log(cwd)
    shellCommand(`npm install ${packageName}@${version}`, cwd)
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    core.setOutput("package_version", version)
} catch (error) {
    core.setFailed(error.message);
}



