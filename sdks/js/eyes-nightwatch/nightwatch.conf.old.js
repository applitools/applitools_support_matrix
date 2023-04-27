const latestConfig = require("./nightwatch.conf")
const test_settings = latestConfig.test_settings
test_settings.default.desiredCapabilities["goog:chromeOptions"].w3c = false
module.exports = {
    src_folders: latestConfig.src_folders,
    custom_commands_path:  latestConfig.custom_commands_path,
    test_settings,
    eyes: latestConfig.eyes
}