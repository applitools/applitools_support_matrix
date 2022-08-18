'use strict'

import {TEST_MATRIX, MATRIX_MAPPING} from "../enums/testMatrix";
import {getJobsDuration} from "./date";
import https from "https";

function getJobsBySuites(arr) {
    const result = [];
    const other = {
        name: 'Other',
        jobs: arr.filter(({name}) => {
            let result = true;
            TEST_MATRIX.forEach(matrix => {
                if(name.split("/")[0].trim() === matrix) result = false
            })
            return result;
        })
    }
    if(other.jobs.length !== 0) {
        other.duration = getJobsDuration(other.jobs)
    }
    TEST_MATRIX.forEach(matrix => {
        const suite = {
            name: MATRIX_MAPPING[matrix],
            jobs: arr.filter(({name})=> name.split("/")[0].trim() === matrix)
        }
        if(suite.jobs.length !== 0) {
            suite.duration = getJobsDuration(suite.jobs)
        }
        result.push(suite)
    })
    result.push(other)
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

async function jobLog({owner, repo, job_id, pat}) {
    const options = {
        hostname: 'api.github.com',
        path: `/repos/${owner}/${repo}/actions/jobs/${job_id}/logs`,
        port: 443,
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `token ${pat}`,
            'User-Agent': 'applitools',
        }
    }
    const getLocation = new Promise((resolve) => {
        const req = https.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
            res.on('data', (d) => {
                process.stdout.write(d);
            });
            resolve(res.headers.location)
        }).on('error', (e) => {
            console.error(e);
            resolve()
        });
        req.end()
    })
    const location = await getLocation
    let url
    try {
        url = new URL(location)
    } catch (e) {
        return;
    }
    return new Promise((resolve) => {
        let body = []
        https.get(url, (res) => {
            console.log('statusCode:', res.statusCode);
            res.on('data', (d) => {
                body.push(d)
            });
            res.on('end', ()=> {
                resolve(Buffer.concat(body).toString());
            });
        }).on('error', (e) => {
            console.error(e);
        })
    })

}

export {
    getJobsBySuites,
    filterTestsJobs,
    getALlJobs,
    jobLog
}