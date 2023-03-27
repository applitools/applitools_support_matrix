const core = require('@actions/core');
const fetch = require("node-fetch");
const {spawn, execSync} = require('child_process');
const {get} = require("https");
const fs = require("fs");
const SeleniumParser = require("./src/SeleniumParser")
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
            await downloadSelenium(URL_3)
            installed_version = execSync(`java -jar ${DOWNLOADED_SELENIUM_3_JAR} --version`)
            selenium = spawn("java", ["-jar", DOWNLOADED_SELENIUM_3_JAR], options)
        } else {
            const parser = new SeleniumParser();
            await parser.collect_data();
            const latestSelenium = parser.getLatest();
            await downloadSelenium(latestSelenium.download_url)
            installed_version = execSync(`java -jar ${latestSelenium.name} standalone --version`)
            selenium = spawn("java", ["-jar", latestSelenium.name, "standalone"], options)
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

