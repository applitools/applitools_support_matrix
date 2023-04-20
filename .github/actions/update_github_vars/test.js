'use strict'
const actionCommand = require("./src/action")

;(async () => {
    try {

        const owner = "applitools";
        const repo = "applitools_support_matrix";
        const pat = process.env.MY_WORK_PAT;
        await actionCommand({owner, repo, pat})

    } catch (error) {
        console.log(error)
    }
})()