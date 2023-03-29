const core = require('@actions/core');
const fetch = require("node-fetch");
const {spawn, execSync} = require('child_process');
const fs = require("fs");
const DOWNLOADED_SELENIUM_3_JAR = "selenium-server.jar";
const URL_3 = "https://selenium-release.storage.googleapis.com/3.141/selenium-server-standalone-3.141.59.jar";
;(async () => {
    const options = {detached: true, stdio: 'ignore'}
    let selenium, installed_version;
    try {
        const legacy = core.getInput('legacy');
        const version = legacy === 'true' ? "3" : "4";
        console.log(`Selenium version is set to ${version}!`);
        if (legacy === 'true') {
            await downloadSelenium(URL_3, DOWNLOADED_SELENIUM_3_JAR)
            installed_version = execSync(`java -jar ${DOWNLOADED_SELENIUM_3_JAR} --version`)
            selenium = spawn("java", ["-jar", DOWNLOADED_SELENIUM_3_JAR], options)
        } else {
            if (process.env.RUNNER_OS === "macOS") {
                installed_version = execSync(`selenium-server standalone --version`)
                selenium = spawn("selenium-server", ["standalone"], options)
            } else {
                installed_version = execSync(`java -jar ${process.env.SELENIUM_JAR_PATH} standalone --version`)
                selenium = spawn("java", ["-jar", process.env.SELENIUM_JAR_PATH, "standalone"], options)
            }
        }
        selenium.unref();
        await waitForSeleniumStart(60)
        console.log("Selenium server started successfully")
        console.log(`Process pid ${selenium.pid}`)
        const time = (new Date()).toTimeString();
        core.setOutput("time", time);
        core.setOutput("version", installed_version.toString());
    } catch (error) {
        core.setFailed(error.message);
    }
})()



async function downloadSelenium(url, name) {
    const res = await fetch(url)
    const file = fs.createWriteStream(name);
    return new Promise((resolve, reject) => {
        res.body.pipe(file);
        res.body.on("error", reject);
        file.on("finish", resolve);
    })
}

async function waitForSeleniumStart(retries) {
    const CHECK_URL = "http://localhost:4444";
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

