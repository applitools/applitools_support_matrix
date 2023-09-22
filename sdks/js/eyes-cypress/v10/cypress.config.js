const {defineConfig} = require("cypress");
const fs = require('fs')
const path = require('path')
const cwd = process.cwd()

function getCypressVersion() {
    const cypressPackage = require.resolve('cypress', {paths: [cwd]})
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(path.dirname(cypressPackage), 'package.json')))
    return packageJson.version
}

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            on('before:browser:launch', (browser = {}, launchOptions) => {
                const cyVersion = getCypressVersion()
                const major = parseInt(cyVersion.split(".")[0])
                if ( major < 12 && browser.name === 'chrome' && browser.isHeadless) {
                    launchOptions.args = launchOptions.args.map((arg) => {
                        if (arg === '--headless') {
                            return '--headless=new'
                        }

                        return arg
                    })
                }

                return launchOptions
            })
        },
    },
});


require('@applitools/eyes-cypress')(module);
