import * as core from '@actions/core'
import path from 'path'
import {shellCommand} from "../util/js/util";
import {parseInputVersion} from "../util/common";

try {
    const packageName = core.getInput('package');
    const dir = core.getInput('working-directory');
    const cwd = path.join(process.cwd(), dir)
    let version;
    version = core.getInput("version")
    version = parseInputVersion({version, packageName, cwd})
    console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
    console.log(`Dir: ${dir} | type: ${typeof dir}`)
    console.log(cwd)
    shellCommand(`npm install ${packageName}@${version}`, cwd)
    const ls = shellCommand(`npm list`, cwd)
    const installed_version = new RegExp(` ${packageName}@.*`).exec(ls)[0]
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    core.setOutput("package_version", installed_version)
} catch (error) {
    core.setFailed(error.message);
}



