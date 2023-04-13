'use strict'

const {TEST_MATRIX, MATRIX_MAPPING} = require("./enums/testMatrix");
const MS = require("./enums/time");
const {getJobsDuration} = require("./date");
const https = require("https");

function organiseSuites(arr) {
    const structure = {suites: {}}

    function addJob(job) {
        let currentSuite = structure;
        let name = job.name.includes("/") ? job.name.split(" / ")[1] : job.name
        for (const str of name.split(" ")) {
            if (str.startsWith("[")) {
                currentSuite.jobs.push(job)
                break;
            }
            if (currentSuite.suites.hasOwnProperty(str)) {
                currentSuite = currentSuite.suites[str]
            } else {
                currentSuite.suites[str] = {
                    name: str,
                    jobs: [],
                    suites: {}
                }
                currentSuite = currentSuite.suites[str]
            }

        }
    }

    arr.forEach(addJob)
    return structure;
}

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

async function jobLog({octokit, owner, repo, job_id}) {
    let response;
    try {
        response = await octokit.rest.actions.downloadJobLogsForWorkflowRun({
            owner: owner,
            repo: repo,
            job_id,
        });
    } catch (e) {
        console.log("There are were an error")
        throw new Error(e.message)
    }

    return response.data
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
    organiseSuites,
    jobLog,
    wait,
    waitForAllCompletedJob
}