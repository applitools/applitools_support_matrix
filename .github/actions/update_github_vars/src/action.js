'use strict'
const {Octokit} = require("@octokit/rest");
const fetch = require("node-fetch");
const semver = require('semver');

async function actionCommand({owner, repo, pat}) {
    const octokit = new Octokit({
        auth: pat,
        request: {
            timeout: 30000,
            retries: 2,
        }
    });

    const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
    const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

    const gh_environment = {
        latest: 'appium_latest',
        previous: 'appium_previous'
    }

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(`${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}`).toString('base64')
        }
    };

    const data = await fetch('https://api.us-west-1.saucelabs.com/rest/v1/info/platforms/appium', requestOptions)
        .then(response => response.json())
    // Used iPhone to get versions cause android devices usually available at all appium versions
    const iphone = data.filter(caps => caps.long_name === "iPhone 8 Simulator").sort((a,b) => {
        return parseFloat(b.short_version) - parseFloat(a.short_version)
    })[0]
    let versions = iphone.supported_backend_versions
    // Remove version '2.0.0' if it exists , looks like meta tag on sauce
    // it haven't been released yet actually and still at beta stage
    versions = versions.filter(version => version !== '2.0.0');
    // Sort versions in descending order
    versions.sort((a, b) => semver.compare(b, a));
    console.log(`Current latest version on sauce: ${versions[0]}`)
    console.log(`Current previous version on sauce: ${versions[1]}`)
    const repoResponse = await octokit.rest.repos.get({owner, repo})
    const repository_id = repoResponse.data.id;
    const latest = await getAppiumVersionEnv(repository_id, gh_environment.latest)
    if (versions[0] !== latest) await updateAppiumVersionEnv(repository_id, gh_environment.latest, versions[0])
    const previous = await getAppiumVersionEnv(repository_id, gh_environment.previous)
    if (versions[1] !== previous) await updateAppiumVersionEnv(repository_id, gh_environment.previous, versions[1])
    console.log(`Current latest version in github env: ${latest}`)
    console.log(`Current previous version in github env: ${previous}`)

    async function getAppiumVersionEnv(repository_id, environment_name) {
        const response = await octokit.rest.actions.getEnvironmentVariable({
            repository_id,
            environment_name,
            name: 'APPIUM_VERSION'
        })
        return response.data.value
    }

    async function updateAppiumVersionEnv(repository_id, environment_name, value) {
        const response = await octokit.rest.actions.updateEnvironmentVariable({
            repository_id,
            environment_name,
            name: 'APPIUM_VERSION',
            value
        })
        console.log(response.status)
        console.log(`For the ${environment_name} APPIUM_VERSION was set to ${value}`)
    }
}

module.exports = actionCommand