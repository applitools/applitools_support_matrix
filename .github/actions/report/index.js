'use strict'
import * as core from '@actions/core'
import {getALlJobs, getJobsBySuites, filterTestsJobs} from './src/util/actions'
import {Report, Suite, Test} from './src/json'
import {getDuration} from'./src/util/date'
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
    const end = jobs[jobs.length-1].completed_at;
    const suites = getJobsBySuites(filtered)
    // Organise and parse raw data Reporting
    const report = new Report({start, end})
    suites.forEach(suiteData => {
        const suite = new Suite({title:suiteData.name, duration:suiteData.duration})
        const tests = suiteData.jobs.map(job => new Test({
            title: job.name.split('/')[1],
            fullTitle: job.name,
            duration: getDuration(job.started_at, job.completed_at),
            passed: job.conclusion === 'success'
        }))
        tests.forEach(test => suite.addTest(test));
        report.addSuite(suite);
    })
    // Make json file
    fs.writeFileSync('data.json', JSON.stringify(report, undefined, 2))
    // Make html report
    await generator.generate()
    console.log(1)
} catch (error) {
    core.setFailed(error.message);
}