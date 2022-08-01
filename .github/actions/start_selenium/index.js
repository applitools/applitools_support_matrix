const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `who-to-greet` input defined in action metadata file
    const legacy = core.getInput('legacy');
    console.log(process.env)
    console.log(`Selenium version is set to ${legacy ? "3" : "4"}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
} catch (error) {
    core.setFailed(error.message);
}