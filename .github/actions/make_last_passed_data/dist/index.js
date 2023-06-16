/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 968:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const {TEST_MATRIX, MATRIX_MAPPING} = __nccwpck_require__(251);
const MS = __nccwpck_require__(250);
const {getJobsDuration} = __nccwpck_require__(543);
const https = __nccwpck_require__(687);

function organiseSuites(arr) {
    const structure = {suites: {}}

    function addJob(job) {
        let currentSuite = structure;
        let name = job.name.includes("/") ? job.name.split(" / ")[1] : job.name
        for (const str of name.split(" ")) {
            if (str.startsWith("[")) {
                currentSuite.jobs.push(job)
                break;
            }
            if (currentSuite.suites.hasOwnProperty(str)) {
                currentSuite = currentSuite.suites[str]
            } else {
                currentSuite.suites[str] = {
                    name: str,
                    jobs: [],
                    suites: {}
                }
                currentSuite = currentSuite.suites[str]
            }

        }
    }

    arr.forEach(addJob)
    return structure;
}

function getJobsBySuites(arr) {
    const result = [];
    const other = {
        name: 'Other',
        jobs: arr.filter(({name}) => {
            let result = true;
            TEST_MATRIX.forEach(matrix => {
                if (name.split("/")[0].trim() === matrix) result = false
            })
            return result;
        })
    }
    if (other.jobs.length !== 0) {
        other.duration = getJobsDuration(other.jobs)
    }
    TEST_MATRIX.forEach(matrix => {
        const suite = {
            name: MATRIX_MAPPING[matrix],
            jobs: arr.filter(({name}) => name.split("/")[0].trim() === matrix)
        }
        if (suite.jobs.length !== 0) {
            suite.duration = getJobsDuration(suite.jobs)
        }
        result.push(suite)
    })
    result.push(other)
    return result
}

function filterTestsJobs({name}) {
    return !name.includes("Setup")
        && name !== 'rerun'
        && name !== 'report_generation'
        && !name.includes('email_notification')
}

async function getALlJobs({octokit, owner, repo, run_id}) {
    let jobs = [];
    let totalCount;
    let page = 1;
    do {
        const response = await octokit.rest.actions.listJobsForWorkflowRun({
            owner,
            repo,
            run_id,
            per_page: 50,
            page
        });
        const data = response.data;
        totalCount = data.total_count;
        jobs = jobs.concat(data.jobs)
        page++
    } while (jobs.length < totalCount)
    return jobs;
}

async function jobLog({octokit, owner, repo, job_id}) {
    let response;
    try {
        response = await octokit.rest.actions.downloadJobLogsForWorkflowRun({
            owner: owner,
            repo: repo,
            job_id,
        });
    } catch (e) {
        console.log("There are were an error")
        throw new Error(e.message)
    }

    return response.data
}

async function waitForAllCompletedJob({octokit, owner, repo, run_id, wait_time = MS.SECOND * 30, tries_limit = 20}) {
    let jobs;
    jobs = await getALlJobs({octokit, owner, repo, run_id});
    let notCompleted = jobs.filter(job => job.status !== 'completed').filter(job => job.name !== process.env.GITHUB_JOB)
    let tries = 1;
    while (notCompleted.length > 0 && tries < tries_limit) {
        console.log("There are not completed jobs")
        notCompleted.forEach(printJob)
        console.log("Waiting for jobs to complete");
        await wait(wait_time);
        jobs = await getALlJobs({octokit, owner, repo, run_id});
        notCompleted = jobs.filter(job => job.status !== 'completed').filter(job => job.name !== process.env.GITHUB_JOB)
        tries++;
    }

    let completed = jobs.filter(job => job.status === 'completed')
    console.log("Completed jobs:")
    completed.forEach(printJob)
    return completed

    function printJob(job) {
        console.log(`${job.name} has status ${job.status} | ${job.started_at} | ${job.completed_at}`)
    }
}

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
    getJobsBySuites,
    filterTestsJobs,
    getALlJobs,
    organiseSuites,
    jobLog,
    wait,
    waitForAllCompletedJob
}

/***/ }),

/***/ 543:
/***/ ((module) => {

"use strict";


function getDuration(start, end) {
    return Date.parse(end) - Date.parse(start)
}

function compareDates(a, b) {
    return Date.parse(a) - Date.parse(b)
}

function getJobsDuration(jobs) {
    if (jobs && Array.isArray(jobs) && jobs.length !== 0) {
        const start = jobs.map(test => test.started_at).sort(compareDates)[0]
        const end = jobs.map(test => test.completed_at).sort(compareDates)[jobs.length - 1]
        return getDuration(start, end)
    }
    return 0;
}

module.exports = {
    getDuration,
    compareDates,
    getJobsDuration,
}

/***/ }),

/***/ 251:
/***/ ((module) => {

"use strict";

const TEST_MATRIX = [
    'java',
    'ruby',
    'python',
    'dotnet',
    'js_selenium',
    'js_playwright',
    'js_webdriverio',
    'js_nightwatch',
    'js_protractor',
    'js_puppeteer',
    'js_cypress',
    'js_testcafe',
    'js_storybook',
]

const MATRIX_MAPPING = {
    'java': 'Java',
    'ruby': 'Ruby',
    'python': 'Python',
    'dotnet': 'Dotnet',
    'js_selenium': 'JS Selenium',
    'js_playwright': 'JS Playwright',
    'js_webdriverio': 'JS Webdriverio',
    'js_nightwatch': 'JS Nightwatch',
    'js_protractor': 'JS Protractor',
    'js_puppeteer': 'JS Puppeteer',
    'js_cypress': 'JS Cypress',
    'js_testcafe': 'JS Testcafe',
    'js_storybook': 'JS Storybook',
}

module.exports = {
    TEST_MATRIX,
    MATRIX_MAPPING
}

/***/ }),

/***/ 250:
/***/ ((module) => {

"use strict";


const MS = {
    SECOND: 1000,
    MINUTES: 60000,
}

module.exports = MS

/***/ }),

/***/ 372:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const crypto = __nccwpck_require__(113)

function uuid() {
    return crypto.randomUUID()
}
module.exports = uuid


/***/ }),

/***/ 564:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 220:
/***/ ((module) => {

module.exports = eval("require")("@octokit/rest");


/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

const core = __nccwpck_require__(564);
const {filterTestsJobs, jobLog, waitForAllCompletedJob} = __nccwpck_require__(968);
const uuid = __nccwpck_require__(372);
const {Octokit} = __nccwpck_require__(220);
const fs = __nccwpck_require__(147);
const path = __nccwpck_require__(17);

;(async () => {
    try {

        // Get jobs data
        const input_run_id = core.getInput('run_id');
        const run_id = input_run_id && input_run_id.length > 0 ? input_run_id : process.env.GITHUB_RUN_ID
        console.log(`Run id used for this run is [${run_id}]`)
        const pat = core.getInput('token')
        const octokit = new Octokit({
            auth: pat,
        });
        const owner = process.env.GITHUB_REPOSITORY.split('/')[0];
        const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
        let jobs = await waitForAllCompletedJob({octokit, owner, repo, run_id});
        const filtered = jobs.filter(filterTestsJobs)
        const filePath = path.join(process.cwd(), 'last_passed.json');
        console.log(`Path to the current file stored last passed data => ${filePath}`)
        const json_string = fs.readFileSync(filePath).toString();
        const current_last_passed = JSON.parse(json_string).data
        // Organise and parse raw data Reporting
        const run_data = []
        for (const job of filtered) {
            const run_data_info = {}
            const passed = job.conclusion === 'success'
            const regex = /####\[Start_json_data](.*)\[End_json_data]####/
            const logs = await jobLog({octokit, owner, repo, job_id: job.id})
            if (logs && typeof logs === 'string') {
                if (regex.test(logs)) {
                    const json_data = JSON.parse(regex.exec(logs)[1])
                    const matrix_data = JSON.parse(json_data.matrix)
                    run_data_info.jobs.push({
                        title: job.name, ...matrix_data,
                        passed,
                        package: json_data.package,
                        version: json_data.version,
                        matrix_string: JSON.stringify(matrix_data)
                    })
                    if (!run_data_info.config_path) run_data_info.config_path = matrix_data.matrix_config_dir
                }
            }
            run_data.push(run_data_info)
        }

        run_data.forEach(suite => {
            const old = current_last_passed.filter(old_suite => suite.title === old_suite.title)[0]
            suite.jobs = suite.jobs.map(job => {
                return job.passed ? job : old.jobs.filter(old_job => old_job.matrix_string === job.matrix_string)[0]
            })
        })

        // Make json file
        const file = {
            id: uuid(), data: run_data
        }
        fs.writeFileSync('last_passed.json', JSON.stringify(file, undefined, 2))
        console.log(1)
    } catch (error) {
        core.setFailed(error.message);
    }
})()

})();

module.exports = __webpack_exports__;
/******/ })()
;