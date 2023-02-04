import * as core from '@actions/core'
import * as fs from 'fs'
import * as path from 'path'

const work_dir = core.getInput('work_dir');
const matrix = fs.readFileSync(path.join(process.cwd(), work_dir, 'matrix.json')).toString();
core.setOutput("matrix", matrix);