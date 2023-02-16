'use strict'

const {TEST_MATRIX, MATRIX_MAPPING} = require("./enums/testMatrix");
const MS = require("./enums/time");
const {getJobsDuration} = require("./date");
const https = require("https");

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
            res.on('end', () => {
                resolve(Buffer.concat(body).toString());
            });
        }).on('error', (e) => {
            console.error(e);
        })
    })

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
    jobLog,
    wait,
    waitForAllCompletedJob
}