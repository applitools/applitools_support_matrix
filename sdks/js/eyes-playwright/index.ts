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
    if(process.env.RUNNER_OS) {
        switch (process.env.RUNNER_OS) {
            case 'macOS':
                // @ts-ignore
                configuration.hostOS = 'Mac OS X 10.15'
                break;
            case 'Windows':
                // @ts-ignore
                configuration.hostOS = 'Windows 10'
                break;
            case 'Linux':
                // @ts-ignore
                configuration.hostOS = 'Linux'
                break;
        }

    }
    const eyes = new Eyes(runner)
    eyes.setConfiguration(configuration)
    return eyes
}