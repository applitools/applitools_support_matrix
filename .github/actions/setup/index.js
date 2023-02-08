import {getInput, getBooleanInput, setOutput} from "@actions/core";
import * as fs from 'fs'
import * as path from 'path'

const work_dir = getInput('work_dir');
const config_file = getInput('config_file');
const use_last_passed = getBooleanInput('last_passed');
const fileName = use_last_passed ? `${config_file}_passed.json` : `${config_file}.json`
// Adding hardcoded string is required for ncc to build it properly into 1 file
const filePath = path.join(process.cwd(), work_dir, 'config',  fileName)
const readedFile =  fs.readFileSync(filePath).toString();
const matrix = JSON.parse(readedFile)
console.log(JSON.stringify(matrix, null, 3))
setOutput("matrix", JSON.stringify(matrix));