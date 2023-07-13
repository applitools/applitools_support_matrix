const {Eyes} = require("@applitools/eyes-selenium")
exports.mochaGlobalSetup = async function() {
    const url = await Eyes.getExecutionCloudUrl();
    process.env.EC_CLOUD_PORT = url.split(":")[2]
}