const {getInput, getBooleanInput, setOutput} = require("@actions/core");
const path = require('path')
const fs = require('fs')

const work_dir = getInput('work_dir');
const use_last_passed = getBooleanInput('last_passed');
let matrix;

const dirs = work_dir.split(', ')



if (use_last_passed) {
    const filePath = path.join(process.cwd(), 'last_passed.json');
    const json_string = fs.readFileSync(filePath).toString();
    const last_passed = JSON.parse(json_string)
    const include = [];
    dirs.forEach(dir => {
        const matrix_jobs = last_passed.data.filter(suite => suite.config_path === dir)[0]
        const dir_include = matrix_jobs.jobs.map(job => ({
            ...JSON.parse(job.matrix_string),
            version: `exact@${job.version}`
        }))
        include.concat(dir_include)
    })

    matrix = {include}
} else {
    // Adding hardcoded string is required for ncc to build it properly into 1 file
    const fileName =  `matrix.conf.js`;
    const include = [];
    dirs.forEach(dir => {
        const filePath = path.join(process.cwd(), dir, 'config',  fileName)
        console.log(`Filepath value: ${filePath}`)
        const readedFile = require(filePath)
        include.concat(readedFile.include.map(matrix_data => ({...matrix_data, matrix_config_dir:dir})))
    })

    matrix = {
        include
    }
}

console.log(JSON.stringify(matrix, null, 3))
setOutput("matrix", JSON.stringify(matrix));