const {Eyes} = require("@applitools/eyes-selenium")
exports.mochaGlobalSetup = async function() {
    process.env.EC_CLOUD_URL = await Eyes.getExecutionCloudUrl();
}