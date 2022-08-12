'use strict'
const marge = require('../../node_modules/mochawesome-report-generator/bin/cli-main')
const options = {
    "_": [
        "data.json"
    ],
    "f": "report",
    "reportFilename": "report",
    "report-filename": "report",
    "i": true,
    "inline": true,
    "inlineAssets": true,
    "inline-assets": true,
    "o": "",
    "reportDir": "",
    "report-dir": "",
    "t": "Support Matrix",
    "reportTitle": "Support Matrix",
    "report-title": "Support Matrix",
    "p": "Support Matrix",
    "reportPageTitle": "Support Matrix",
    "report-page-title": "Support Matrix",
    "cdn": false,
    "charts": false,
    "enableCharts": false,
    "enable-charts": false,
    "code": true,
    "enableCode": true,
    "enable-code": true,
    "autoOpen": false,
    "auto-open": false,
    "overwrite": true,
    "timestamp": false,
    "ts": false,
    "showPassed": true,
    "show-passed": true,
    "showFailed": true,
    "show-failed": true,
    "showPending": true,
    "show-pending": true,
    "showSkipped": false,
    "show-skipped": false,
    "showHooks": "failed",
    "show-hooks": "failed",
    "saveJson": false,
    "save-json": false,
    "saveHtml": true,
    "save-html": true,
    "dev": false,
};

const generator = {
    generate:async function() {
        await marge(options)
    }
}

export {
    generator
}