'use strict'
import * as core from '@actions/core'

import {waitForAllCompletedJob, getJobsBySuites, filterTestsJobs, jobLog} from '../util/github_rest/actions'
import {getDuration, compareDates} from '../util/github_rest/date'
import uuid from '../util/github_rest/uuid'
import {Octokit} from '@octokit/rest'
import * as fs from 'fs'

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
    const start = jobs.map(test => test.started_at).sort(compareDates)[0]
    const end = jobs.map(test => test.completed_at).sort(compareDates)[jobs.length - 1]
    const suites = getJobsBySuites(filtered)
    // Organise and parse raw data Reporting
    const run_data = []
    for (const suiteData of suites) {
        const run_data_info = {
            title: suiteData.name,
            jobs: []
        }
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
                    run_data_info.jobs.push({...json_data, ...testData})
                }
            }
        }
        run_data.push(run_data_info)
    }
    // Make json file
    const file = {
        id: uuid(),
        data: run_data
    }
    fs.writeFileSync('run_data.json', JSON.stringify(file, undefined, 2))
    console.log(1)
} catch (error) {
    core.setFailed(error.message);
}