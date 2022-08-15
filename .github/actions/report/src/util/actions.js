'use strict'

import {TEST_MATRIX} from "../enums/testMatrix";
import {compareDates, getDuration} from "./date";

function getJobsBySuites(arr) {
    const result = [];
    TEST_MATRIX.forEach(matrix => {
        const suite = {
            name: matrix,
            jobs: arr.filter(({name})=> name.split("/")[0].trim() === matrix)
        }
        if(suite.jobs.length !== 0) {
            const start = suite.jobs.map(test => test.started_at).sort(compareDates)[0]
            const end = suite.jobs.map(test => test.completed_at).sort(compareDates)[suite.jobs.length - 1]
            suite.duration = getDuration(start, end)
        }
        result.push(suite)
    })
    return result
}

function filterTestsJobs({name}) {
    return !name.includes("Batch_id")
        && name !== 'rerun'
        && name !== 'report_generation'
        && name !== 'email_notification'
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

export {
    getJobsBySuites,
    filterTestsJobs,
    getALlJobs
}