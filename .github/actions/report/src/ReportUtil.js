'use strict'
const {Suite, Test} = require("./json");
const {getJobsDuration, getDuration} = require("../../util/github_rest/date");
const {getALlJobs, jobLog, waitForAllCompletedJob} = require("../../util/github_rest/actions");
const MS = require("../../util/github_rest/enums/time");
const stringify = require('json-stringify-safe');
const {Octokit} = require("@octokit/rest");

class ReportUtil {

    constructor({ pat, owner, repo}) {
        this.pat = pat
        this.owner = owner
        this.repo = repo
        this.octokit = new Octokit({
            auth: pat,
            request: {
                timeout: 30000,
                retries: 2,
            }
        });
        this.MakeSuite = this.MakeSuite.bind(this)
        this.getJobLog = this.getJobLog.bind(this)
        this.getALlJobs = this.getALlJobs.bind(this)
        this.waitForAllCompletedJob = this.waitForAllCompletedJob.bind(this)
        this.prepareContext = this.prepareContext.bind(this)
        this.parseError = this.parseError.bind(this)
        this.generateReportTitle = this.generateReportTitle.bind(this)
        this.getLangVersion = this.getLangVersion.bind(this)
        this.getAppiumServerVersion = this.getAppiumServerVersion.bind(this)
        this.formatPackageVersion = this.formatPackageVersion.bind(this)
        this.formatSeleniumServerVersion = this.formatSeleniumServerVersion.bind(this)
    }


    prepareContext(object_data, str_arr) {
        const ctx = []
        ctx.push(...str_arr)
        for (const prop in object_data) {
            if (object_data[prop]) {
                ctx.push(`${prop} : ${object_data[prop]}`)
            }
        }
        return stringify(ctx, null, 2);
    }

    async generateReportTitle(object_data) {
        const eyesSDK = object_data.title.split("[")[0]
        const matrix = JSON.parse(object_data.matrix)
        const env = [];
        env.push(matrix.container_name || object_data.os)
        env.push(this.getLangVersion(matrix))
        env.push(this.formatPackageVersion(object_data))
        // isAppium deprecated
        if (matrix.use_appium || matrix.isAppium) {
            env.push(await this.getAppiumServerVersion(matrix.gh_environment))
        }
        if (matrix.use_selenium) {
            env.push(this.formatSeleniumServerVersion(object_data))
        }
        return `${eyesSDK} [${env.join(' | ')}]`
    }

    async getAppiumServerVersion(gh_environment){
        const repoResponse = await this.octokit.rest.repos.get({owner: this.owner, repo: this.repo})
        const repository_id = repoResponse.data.id;
        const variableResponse = await this.octokit.rest.actions.getEnvironmentVariable({
            repository_id,
            environment_name:gh_environment,
            name: 'APPIUM_VERSION'
        })
        return `appium server: ${variableResponse.data.value}`
    }

    formatSeleniumServerVersion(data){
        return data.selenium.split(",")[0]
    }

    formatPackageVersion(data){
        const packageString = data.groupId ?
            `${data.groupId}/${data.artifactId}` :
            `${data.package}`
        return `${packageString} : ${data.version}`
    }

    getLangVersion(matrix) {
        switch (matrix.test_runner) {
            case 'js':
                return `node-version: ${matrix['node-version']}`
            case 'dotnet':
                return `dotnet-version: ${matrix['dotnet-version']}`
            case 'java':
                return `java-version: ${matrix['java-version']}`
            case 'ruby':
                return `ruby-version: ${matrix['ruby-version']}`
            case 'python':
                return `python-version: ${matrix['python-version']}`
            default: throw new Error(`Unsupported runner used need an update. Runner: ${matrix.test_runner}`)
        }
    }

    parseError(logs) {
        const regex = /##\[endgroup\](?:(?!##\[endgroup\]).)*?(?=##\[error\])/gs;
        const matches = logs.match(regex);
        let errorLogs;
        if (matches) {
            const lastMatch = matches[matches.length - 1];
            errorLogs = lastMatch.replace("##[endgroup]", "");
            return {
                message: "Here are error logs",
                estack: errorLogs,
                diff: null,
            }
        }
        return {
            message: "No logs were found",
            estack: undefined,
            diff: null,
        }
    }

    async MakeSuite(suiteData) {
        const suite = new Suite({title: suiteData.name, duration: getJobsDuration(suiteData.jobs)})
        for (const job of suiteData.jobs) {
            const testData = {
                title: job.name,
                fullTitle: job.name,
                duration: getDuration(job.started_at, job.completed_at),
                passed: job.conclusion === 'success'
            }
            const logs = await this.getJobLog({ job_id: job.id,})
            if (logs && typeof logs === 'string') {
                const regex = /####\[Start_json_data](.*)\[End_json_data]####/
                if (regex.test(logs)) {
                    const json_data = JSON.parse(regex.exec(logs)[1])
                    if (json_data.title) testData.title = await this.generateReportTitle(json_data)
                    testData.code = JSON.stringify(json_data, undefined, 2);
                    testData.context = this.prepareContext(json_data, [job.html_url])
                }
            }
            if (!testData.passed) {
                testData.err = this.parseError(logs)
            }
            suite.addTest(new Test(testData))
        }
        for (const suiteName in suiteData.suites) {
            const innerData = suiteData.suites[suiteName]
            const innerSuite = await this.MakeSuite(innerData)
            suite.addSuite(innerSuite);
        }
        return suite;
    }

    async getALlJobs({ run_id}) {
        return await getALlJobs({
            octokit: this.octokit,
            owner: this.owner,
            repo: this.repo,
            run_id
        })
    }

    async getJobLog({job_id}) {
        console.log(`Getting logs for the job: ${job_id}`)
        return await jobLog({
            octokit: this.octokit,
            owner: this.owner,
            repo: this.repo,
            job_id
        })

    }

    async waitForAllCompletedJob({run_id, wait_time = MS.SECOND * 30, tries_limit = 20}) {
        return await waitForAllCompletedJob({
            octokit: this.octokit,
            owner: this.owner,
            repo: this.repo,
            run_id,
            wait_time,
            tries_limit
        })
    }

}


module.exports = ReportUtil