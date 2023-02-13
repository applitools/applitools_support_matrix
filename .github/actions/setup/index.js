const {getInput, getBooleanInput, setOutput} = require("@actions/core");
const path = require('path')

const work_dir = getInput('work_dir');
const use_last_passed = getBooleanInput('last_passed');
const fileName = use_last_passed ? `matrix_passed.conf.js` : `matrix.conf.js`
// Adding hardcoded string is required for ncc to build it properly into 1 file
const filePath = path.join(process.cwd(), work_dir, 'config',  fileName)
const readedFile = require(filePath)
const matrix = readedFile.include.map(matrix_data => ({...matrix_data, matrix_config_dir:work_dir}))
console.log(JSON.stringify(matrix, null, 3))
setOutput("matrix", JSON.stringify(matrix));