import * as core from '@actions/core'

try {
    const pack = core.getInput('package');
    const version = core.getInput('version');
    const os = core.getInput('os');
    const matrix_os = core.getInput('matrix_os');
    const work_dir = core.getInput('work_dir');
    const selenium = core.getInput('selenium');
    const title = core.getInput('title');
    const chrome_version = core.getInput('chrome_version');
    const chromedriver_version = core.getInput('chromedriver_version');
    const appium_client_lib_version = core.getInput('Appium_client')
    const data = {
        package: pack,
        version,
        os,
        matrix_os,
        work_dir,
        selenium,
        title,
        chrome_version,
        chromedriver_version,
        appium_client_lib_version,
    }
    console.log(`####[Start_json_data]${JSON.stringify(data)}[End_json_data]####`)
} catch (error) {
    core.setFailed(error.message);
}




