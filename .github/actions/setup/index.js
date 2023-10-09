const {getInput, getBooleanInput, setOutput} = require("@actions/core");
const {prepareInclude} = require("./src/util")


const work_dir = getInput('work_dir');
const sdk_versions_json = getInput('sdk_versions_json')
const use_last_passed = getBooleanInput('last_passed');
let matrix;

if(!work_dir && !sdk_versions_json) {
    throw new Error("Missing input for required sdks to test")
}

let dirs = work_dir.split(', ')


let include = prepareInclude(sdk_versions_json,dirs,use_last_passed);


matrix = {include}
console.log(JSON.stringify(matrix, null, 3))
setOutput("matrix", JSON.stringify(matrix));

const web = {include: include.filter(job => !job.use_appium && !job.use_container)}
console.log(JSON.stringify(web, null, 3))
setOutput("web", JSON.stringify(web));

const appium = {include: include.filter(job => job.use_appium)}
console.log(JSON.stringify(appium, null, 3))
setOutput("appium", JSON.stringify(appium));

const container = {include: include.filter(job => job.use_container)}
console.log(JSON.stringify(container, null, 3))
setOutput("container", JSON.stringify(container));

const date = new Date();
const day = date.getDate();

if (day % 2 === 0) {
    setOutput("orientation", "PORTRAIT")
} else {
    setOutput("orientation", "LANDSCAPE")
}
