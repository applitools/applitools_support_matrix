import * as core from '@actions/core'
import * as github from '@actions/github'
import * as fetch from 'node-fetch'
import {get} from 'https'
import * as fs from 'fs'
import path from 'path'
import {Version, parseVersion, strToNum, shellCommand, getLatest, getAllVersions} from "./util";

try {
    const packageName = core.getInput('package');
    const major = strToNum(core.getInput('major'));
    const minor = strToNum(core.getInput('minor'));
    const patch = strToNum(core.getInput('patch'));
    const dir = core.getInput('working-directory');
    const cwd = path.join(process.cwd(), dir)
    console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
    console.log(`Major: ${major} | type: ${typeof major}`)
    console.log(`Minor: ${minor} | type: ${typeof minor}`)
    console.log(`Patch: ${patch} | type: ${typeof patch}`)
    console.log(`Dir: ${dir} | type: ${typeof dir}`)
    console.log(cwd)
    const latest = getLatest(packageName, cwd)
    console.log(latest)
    const all = getAllVersions(packageName, cwd)
    console.log(all[0])
    console.log(all[1])
    console.log(all[2])
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
} catch (error) {
    core.setFailed(error.message);
}

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

