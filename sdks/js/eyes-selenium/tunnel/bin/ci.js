"use strict";
const path = require("path");
const cp = require("child_process");
const options = {stdio: "inherit", cwd: path.resolve(__dirname, "../")}
const server = cp.spawn("npm", ["start"], options)
process.env.APPLITOOLS_EG_FRPC_CACHE_DIRECTORY = path.resolve(__dirname, "../tunnel_bin")
setTimeout(() => {
    try {
        cp.execSync("npm test", options)
    } finally {
        server.kill();
    }
}, 4000);


