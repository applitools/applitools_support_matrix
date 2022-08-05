import * as core from '@actions/core'
import * as github from '@actions/github'
import * as fetch from 'node-fetch'
import {execSync} from 'child_process'
import {get} from 'https'
import * as fs from 'fs'

try {
    const packageName = core.getInput('package');
    const major = core.getInput('major');
    const minor = core.getInput('minor');
    const patch = core.getInput('patch');
    console.log(`Package name: ${packageName} | type: ${typeof packageName}`)
    console.log(`Major: ${major} | type: ${typeof major}`)
    console.log(`Minor: ${minor} | type: ${typeof minor}`)
    console.log(`Patch: ${patch} | type: ${typeof patch}`)
    console.log(process.cwd())
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

