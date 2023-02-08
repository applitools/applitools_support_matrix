import * as core from '@actions/core'
import * as fetch from 'node-fetch'
import {spawn, execSync} from 'child_process'
import {get} from 'https'
import * as fs from 'fs'

const DOWNLOADED_SELENIUM_JAR = "selenium-server.jar";
const URL_3 = "https://selenium-release.storage.googleapis.com/3.141/selenium-server-standalone-3.141.59.jar"
const CHECK_URL = "http://localhost:4444"
const options = {detached: true, stdio: 'ignore'}
let selenium;
try {
    const legacy = core.getInput('legacy');
    const version = legacy === 'true' ? "3" : "4";
    console.log(`Selenium version is set to ${version}!`);
    let installed_version;
    if (legacy === 'true') {
        await downloadSelenium(URL_3)
        // installed_version = execSync(`java -jar ${DOWNLOADED_SELENIUM_JAR} --version`)
        selenium = spawn("java", ["-jar", DOWNLOADED_SELENIUM_JAR], options)
    } else {
        if (process.env.RUNNER_OS === "macOS") {
            // installed_version = execSync(`selenium-server standalone --version`)
            selenium = spawn("selenium-server", ["standalone"], options)
        } else {
            // installed_version = execSync(`java -jar ${process.env.SELENIUM_JAR_PATH} standalone --version`)
            selenium = spawn("java", ["-jar", process.env.SELENIUM_JAR_PATH, "standalone"], options)

        }
    }
    selenium.unref();
    await waitForSeleniumStart(60)
    console.log("Selenium server started successfully")
    console.log(`Process pid ${selenium.pid}`)
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    core.setOutput("version", installed_version);
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

async function waitForSeleniumStart(retries) {
    while(retries > 0) {
        try {
            const result = await fetch(CHECK_URL)
            if (result.status === 200) return
            await sleep(1000)
        } catch (ex) {
            await sleep(1000)
        }
    }
    if (retries === 0) throw new Error('Selenium server failed to start')
}

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

