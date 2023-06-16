'use strict'
const {filterTestsJobs, jobLog, waitForAllCompletedJob} = require('../util/github_rest/actions');
const uuid = require('../util/github_rest/uuid');
const {Octokit} = require('@octokit/rest');
const fs = require('fs');
const path = require("path");

;(async () => {


    // Get jobs data
    const input_run_id = "5294153994";
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
    const filePath = path.join(process.cwd(), 'last_passed.json');
    console.log(`Path to the current file stored last passed data => ${filePath}`)
    const json_string = fs.readFileSync(filePath).toString();
    const current_last_passed = JSON.parse(json_string).data.filter(job => job !==null && job.title)
    // Organise and parse raw data Reporting
    const run_data = []
    for (const job of filtered) {
        let run_data_info;
        const passed = job.conclusion === 'success'
        const regex = /####\[Start_json_data](.*)\[End_json_data]####/
        const logs = await jobLog({octokit, owner, repo, job_id: job.id})
        if (logs && typeof logs === 'string') {
            if (regex.test(logs)) {
                const json_data = JSON.parse(regex.exec(logs)[1])
                const matrix_data = JSON.parse(json_data.matrix)
                run_data_info = {
                    title: job.name, ...matrix_data,
                    passed,
                    package: json_data.package,
                    version: json_data.version,
                    matrix_string: JSON.stringify(matrix_data)
                }
            }
        }
        run_data.push(run_data_info)
    }

    run_data.forEach((job, index, arr) => {
        const old = current_last_passed.filter(old_job => job.title === old_job.title)[0]
        if (!job.passed && old) arr[index] = old;
    })

    // Make json file
    const file = {
        id: uuid(), data: run_data
    }
    fs.writeFileSync('last_passed.json', JSON.stringify(file, undefined, 2))
    console.log(1)

})()
