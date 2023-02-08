import * as core from '@actions/core'
import * as fs from 'fs'
import * as path from 'path'

const work_dir = core.getInput('work_dir');
const config_file = core.getInput('config_file');
const use_last_passed = core.getInput('last_passed');
const fileName = use_last_passed ? `${config_file}_passed.json` : `${config_file}.json`
const readedFile =  fs.readFileSync(path.join(process.cwd(), work_dir, fileName)).toString();
const matrix = JSON.parse(readedFile)
console.log(JSON.stringify(matrix, null, 3))
core.setOutput("matrix", JSON.stringify(matrix));