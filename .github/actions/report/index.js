'use strict'
const core = require('@actions/core')

const {filterTestsJobs, organiseSuites} = require('../util/github_rest/actions')
const {Report} = require('./src/json')
const {compareDates} = require('../util/github_rest/date')
const fs = require('fs')
const {generator} = require('./src/generation/generator')
const ReportUtil = require("./src/ReportUtil");
;(async () => {
    try {

        // Get run and jobs data
        const input_run_id = core.getInput('run_id');
        const run_id = input_run_id && input_run_id.length > 0 ? input_run_id : process.env.GITHUB_RUN_ID
        console.log(`Run id used for this run is [${run_id}]`)
        const pat = core.getInput('token')
        const owner = process.env.GITHUB_REPOSITORY.split('/')[0];
        const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
        const reportUtil = new ReportUtil({pat, owner, repo})
        let jobs = await reportUtil.waitForAllCompletedJob({octokit, owner, repo, run_id});
        const filtered = jobs.filter(filterTestsJobs)
        const start = jobs.map(test => test.started_at).sort(compareDates)[0]
        const end = jobs.map(test => test.completed_at).sort(compareDates)[jobs.length - 1]
        const struct = organiseSuites(filtered)
        const report = new Report({start, end})
        for (const suiteName in struct.suites) {
            const suiteData = struct.suites[suiteName]
            const suite = await reportUtil.MakeSuite(suiteData)
            report.addSuite(suite);
        }
        // Make json file
        fs.writeFileSync('data.json', JSON.stringify(report, undefined, 2))
        // Make html report
        await generator.generate()
        console.log(1)
    } catch (error) {
        core.setFailed(error.message);
    }
})()
