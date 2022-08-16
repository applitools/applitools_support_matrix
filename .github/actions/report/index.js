'use strict'
import * as core from '@actions/core'
import {getALlJobs, getJobsBySuites, filterTestsJobs} from './src/util/actions'
import {Report, Suite, Test} from './src/json'
import {getDuration} from './src/util/date'
import {Octokit} from '@octokit/rest'
import * as fs from 'fs'
import {generator} from './src/generation/generator'

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
    const jobs = await getALlJobs({octokit, owner, repo, run_id});
    const filtered = jobs.filter(filterTestsJobs)
    const start = jobs[0].started_at;
    const end = jobs[jobs.length - 1].completed_at;
    const suites = getJobsBySuites(filtered)
    // Organise and parse raw data Reporting
    const report = new Report({start, end})
    for(const suiteData of suites) {
        const suite = new Suite({title: suiteData.name, duration: suiteData.duration})
        for (const job of suiteData.jobs) {
            const testData = {
                title: job.name.split('/')[1],
                fullTitle: job.name,
                duration: getDuration(job.started_at, job.completed_at),
                passed: job.conclusion === 'success'
            }
            const regex = /####\[Start_json_data](.*)\[End_json_data]####/
            console.log(job.id)
            // const response = await octokit.rest.actions.downloadJobLogsForWorkflowRun({owner, repo, job_id: job.id})
            const response = await octokit.rest.actions.downloadJobLogsForWorkflowRun({
                owner: "applitools",
                repo: "applitools_support_matrix",
                job_id: "7836143014"
            })
            console.log(response.status)
            console.log(regex.test(response.data))
            console.log(response)
            if(response.status === 200 && regex.test(response.data)) {
                const json_data = JSON.parse(regex.exec(response.data)[1])
                console.log(json_data)
                testData.code = json_data;
            }
            suite.addTest(new Test(testData))
        }
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