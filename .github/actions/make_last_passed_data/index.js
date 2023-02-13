'use strict'
import * as core from '@actions/core'

import {filterTestsJobs, getJobsBySuites, jobLog, waitForAllCompletedJob} from '../util/github_rest/actions'
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
    const suites = getJobsBySuites(filtered)
    const current_last_passed = require("./last_passed.json").data
    // Organise and parse raw data Reporting
    const run_data = []
    for (const suiteData of suites) {
        const run_data_info = {
            title: suiteData.name,
            jobs: []
        }
        for (const job of suiteData.jobs) {
            const passed = job.conclusion === 'success'
            const regex = /####\[Start_json_data](.*)\[End_json_data]####/
            const logs = await jobLog({owner, repo, job_id: job.id, pat})
            if (logs && typeof logs === 'string') {
                if (regex.test(logs)) {
                    const json_data = JSON.parse(regex.exec(logs)[1])
                    const matrix_data = JSON.parse(json_data.matrix)
                    run_data_info.jobs.push(
                        {
                            title: job.name,
                            ...matrix_data,
                            passed,
                            package: json_data.package,
                            version: json_data.version,
                            matrix_string: JSON.stringify(matrix_data)
                        })
                    if (!run_data_info.config_path) run_data_info.config_path = matrix_data.matrix_config_dir
                }
            }
        }
        run_data.push(run_data_info)
    }

    run_data.forEach(suite => {
        const old = current_last_passed.filter(old_suite => suite.title === old_suite.title)
        suite.jobs = suite.jobs.map(job => {
             return job.passed ? job : old.jobs.filter(old_job => old_job.matrix_string === job.matrix_string)[0]
        })
    })

    // Make json file
    const file = {
        id: uuid(),
        data: run_data
    }
    fs.writeFileSync('last_passed.json', JSON.stringify(file, undefined, 2))
    console.log(1)
} catch (error) {
    core.setFailed(error.message);
}