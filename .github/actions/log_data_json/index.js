const core = require('@actions/core')

try {
    const pack = core.getInput('package');
    const version = core.getInput('version');
    const os = core.getInput('os');
    const matrix = core.getInput('matrix');
    const work_dir = core.getInput('work_dir');
    const selenium = core.getInput('selenium');
    const title = core.getInput('title');
    const chrome_version = core.getInput('chrome_version');
    const chromedriver_version = core.getInput('chromedriver_version');
    const appium_client_lib_version = core.getInput('Appium_client')
    const orientation = process.env.MATRIX_DEVICE_ORIENTATION
    const data = {
        package: pack,
        version,
        os,
        selenium,
        title,
        chrome_version,
        chromedriver_version,
        appium_client_lib_version,
        matrix,
        work_dir,
        orientation
    }
    console.log(`####[Start_json_data]${JSON.stringify(data)}[End_json_data]####`)
} catch (error) {
    core.setFailed(error.message);
}




