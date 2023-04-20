const core = require("@actions/core");
const actionCommand = require("./src/action");
;(async () => {
    try {
        const pat = core.getInput('token')
        const owner = process.env.GITHUB_REPOSITORY.split('/')[0];
        const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
        await actionCommand({owner, repo, pat})
    } catch (error) {
        core.setFailed(error.message);
    }
})()

