/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
    on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
            launchOptions.args = launchOptions.args.map((arg) => {
                if (arg === '--headless') {
                    return '--headless=new'
                }

                return arg
            })
        }

        return launchOptions
    })
}


require('@applitools/eyes-cypress')(module);