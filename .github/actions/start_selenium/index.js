import * as core from '@actions/core'
import * as github from '@actions/github'
import {spawn} from 'child_process'
import {get} from 'https'
import * as fs from 'fs'

const DOWNLOADED_SELENIUM_JAR = "selenium-server.jar";
const URL_3 = "https://selenium-release.storage.googleapis.com/3.141/selenium-server-standalone-3.141.59.jar"
const options = {detached: true, stdio: 'ignore'}
let selenium;
try {
    const legacy = core.getInput('legacy');
    console.log(`Selenium version is set to ${legacy === 'true' ? "3" : "4"}!`);
    if (legacy === 'true') {
        await downloadSelenium(URL_3)
        selenium = spawn("java", ["-jar", DOWNLOADED_SELENIUM_JAR], options)
        selenium.once("close", (code) => {
            console.log(`Process was closed with the code: ${code}`)
        })
    } else {
        selenium = process.env.RUNNER_OS === "macOS" ?
            spawn("selenium-server", ["standalone"], options) :
            spawn("java", ["-jar", process.env.SELENIUM_JAR_PATH, "standalone"], options)
    }
    console.log(selenium)
    selenium.unref();
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
} catch (error) {
    core.setFailed(error.message);
}

async function downloadSelenium(url) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(DOWNLOADED_SELENIUM_JAR);
        get(url, function (response) {
            response.pipe(file);

            // after download completed close filestream
            file.on("finish", () => {
                file.close();
                console.log("Download Completed");
                resolve();
            });
            file.on("error", (err) => {
                reject(err)
            })
        });
    })
}