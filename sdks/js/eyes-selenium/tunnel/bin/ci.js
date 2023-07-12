"use strict";
const path = require("path");
const cp = require("child_process");
const options = {stdio: "inherit", cwd: path.resolve(__dirname, "../")}
const server = cp.spawn("npm start", [], options)
setTimeout(() => {
    cp.execSync("npm test", options) // Does not terminate the Node.js process in the shell.
}, 4000);


