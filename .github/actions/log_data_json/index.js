import * as core from '@actions/core'

try {
    const pack = core.getInput('package');
    const version = core.getInput('version');
    const os = core.getInput('os');
    const selenium = core.getInput('selenium');
    const title = core.getInput('title');
    const data = {
        package: pack,
        version,
        os,
        selenium,
        title,
    }
    console.log(`####[Start_json_data]${JSON.stringify(data)}[End_json_data]####`)
} catch (error) {
    core.setFailed(error.message);
}




