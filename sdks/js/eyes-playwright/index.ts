// @ts-ignore

import {Eyes, VisualGridRunner, Target} from "@applitools/eyes-playwright"

const batch = {
    name: process.env.APPLITOOLS_BATCH_NAME || 'JS Support Matrix Eyes Playwright',
}

export function setupEyes({vg, ...config}) {
    const runner = (vg ? new VisualGridRunner({testConcurrency: 500}) : undefined)
    const configuration = {
        apiKey: process.env.APPLITOOLS_API_KEY,
        batch,
        parentBranchName: 'master',
        branchName: 'master',
        dontCloseBatches: true,
        matchTimeout: 0,
        saveNewTests: false,
        ...config,
    }
    const eyes = new Eyes(runner)
    eyes.setConfiguration(configuration)
    return eyes
}