import * as core from '@actions/core'
import * as fs from 'fs'
import * as path from 'path'

const work_dir = core.getInput('work_dir');
const readedFile =  fs.readFileSync(path.join(process.cwd(), work_dir, 'matrix.json')).toString();
const matrix = JSON.parse(readedFile)
console.log(JSON.stringify(matrix, null, 3))
core.setOutput("matrix", JSON.stringify(matrix));