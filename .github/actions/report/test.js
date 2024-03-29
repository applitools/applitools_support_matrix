'use strict'

const {waitForAllCompletedJob, filterTestsJobs, jobLog, organiseSuites} = require('../util/github_rest/actions')
const {getJobsDuration} = require('../util/github_rest/date')
const {Report, Suite, Test} = require('./src/json')
const {getDuration, compareDates} = require('../util/github_rest/date')
const {Octokit} = require('@octokit/rest')
const fs = require('fs')
const {generator} = require('./src/generation/generator')

;(async () => {
    try {

        // Get run and jobs data
        // const input_run_id = "4415380844";
        const input_run_id = "4591608142";
        const run_id = input_run_id && input_run_id.length > 0 ? input_run_id : process.env.GITHUB_RUN_ID
        console.log(`Run id used for this run is [${run_id}]`)
        const pat = process.env.MY_WORK_PAT
        const octokit = new Octokit({
            auth: pat,
        });
        const owner = "applitools";
        const repo = "applitools_support_matrix";
        let jobs = await waitForAllCompletedJob({octokit, owner, repo, run_id});
        const filtered = jobs.filter(filterTestsJobs)
        const start = jobs.map(test => test.started_at).sort(compareDates)[0]
        const end = jobs.map(test => test.completed_at).sort(compareDates)[jobs.length - 1]
        const struct = organiseSuites(filtered)
        const report = new Report({start, end})
        for (const suiteName in struct.suites) {
            const suiteData = struct.suites[suiteName]
            const suite = await MakeSuite(suiteData)
            report.addSuite(suite);
        }
        // const suites = getJobsBySuites(filtered)
        // // Organise and parse raw data Reporting
        // const report = new Report({start, end})
        // for (const suiteData of suites) {
        //     const suite = new Suite({title: suiteData.name, duration: suiteData.duration})
        //     for (const job of suiteData.jobs) {
        //         const testData = {
        //             title: job.name.split('/')[1],
        //             fullTitle: job.name,
        //             duration: getDuration(job.started_at, job.completed_at),
        //             passed: job.conclusion === 'success'
        //         }
        //         const regex = /####\[Start_json_data](.*)\[End_json_data]####/
        //         const logs = await jobLog({owner, repo, job_id: job.id, pat})
        //         if (logs && typeof logs === 'string') {
        //             if (regex.test(logs)) {
        //                 const json_data = JSON.parse(regex.exec(logs)[1])
        //                 if (json_data.title) testData.title = json_data.title;
        //                 testData.code = JSON.stringify(json_data, undefined, 2);
        //             }
        //         }
        //         suite.addTest(new Test(testData))
        //     }
        //     report.addSuite(suite);
        // }
        // Make json file
        fs.writeFileSync('data.json', JSON.stringify(report, undefined, 2))
        // Make html report
        await generator.generate()
        console.log(1)

        async function MakeSuite(suiteData) {
            const suite = new Suite({title: suiteData.name, duration: getJobsDuration(suiteData.jobs)})
            for (const job of suiteData.jobs) {
                const testData = {
                    title: job.name.split('/')[1],
                    fullTitle: job.name,
                    duration: getDuration(job.started_at, job.completed_at),
                    passed: job.conclusion === 'success'
                }
                const regex = /####\[Start_json_data](.*)\[End_json_data]####/
                const logs = await jobLog({owner, repo, job_id: job.id, pat})
                if (logs && typeof logs === 'string') {
                    if (regex.test(logs)) {
                        const json_data = JSON.parse(regex.exec(logs)[1])
                        if (json_data.title) testData.title = json_data.title;
                        testData.code = JSON.stringify(json_data, undefined, 2);
                    }
                }
                suite.addTest(new Test(testData))
            }
            for (const suiteName in suiteData.suites) {
                const innerData = suiteData.suites[suiteName]
                const innerSuite = await MakeSuite(innerData)
                suite.addSuite(innerSuite);
            }
            return suite;
        }
    } catch (error) {
        console.log(error)
        console.log(error.stack)
    }
})()


