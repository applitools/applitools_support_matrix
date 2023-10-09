const path = require('path')
const fs = require('fs')
const DIR_MAP = require('./DirMap')

function lastPassedFLow(sdks) {
    let include = []
    const filePath = path.join(process.cwd(), 'last_passed.json');
    const json_string = fs.readFileSync(filePath).toString();
    const last_passed = JSON.parse(json_string)
    sdks.forEach(sdk => {
        const matrix_jobs = last_passed.data.filter(job => job.matrix_config_dir === sdk.dir)
        const dir_include = matrix_jobs.map(job => ({
            ...JSON.parse(job.matrix_string),
            version: `exact@${job.version}`,
            eyes_version: sdk.eyes_version
        }))
        include = include.concat(dir_include)
    })
    return include;
}

function defaultFlow(sdks) {
    let include = []
    // Adding hardcoded string is required for ncc to build it properly into 1 file
    const fileName = `matrix.conf.js`;
    sdks.forEach(sdk => {
        const filePath = path.join(process.cwd(), sdk.dir, 'config', fileName)
        console.log(`Filepath value: ${filePath}`)
        const readedFile = require(filePath)
        include = include.concat(readedFile.include.map(matrix_data => ({
            ...matrix_data,
            matrix_config_dir: sdk.dir,
            eyes_version: sdk.eyes_version
        })))
    })
    return include;
}

function prepareSDKs(sdk_versions_json, dirs) {
    if (sdk_versions_json) {
        return prepareVersionsJson(sdk_versions_json)
    }

    return dirs.map(dir => ({dir: dir, eyes_version: `latest@`}))
}

function prepareInclude(sdk_versions_json, dirs, use_last_passed) {
    let sdks = prepareSDKs(sdk_versions_json, dirs)
    if (use_last_passed) {
        return lastPassedFLow(sdks);
    } else {
        return defaultFlow(sdks)
    }
}

function prepareVersionsJson(sdk_versions_json) {
    const checked = sdk_versions_json.filter(sdk => DIR_MAP.has(sdk.name))
    if(checked.length < sdk_versions_json.length) {
        sdk_versions_json.filter(sdk => !DIR_MAP.has(sdk.name)).forEach(sdk => {
            console.error(`SDK with name ${sdk.name} doesn't have mapping so there support matrix tests wasn't executed for it.`)
        })
        throw new Error("There are was passed unsupported sdk name")
    }
    return checked.map(sdk => ({
        dir: DIR_MAP.get(sdk.name),
        eyes_version: sdk.version
    }))

}

module.exports = {
    prepareInclude
}