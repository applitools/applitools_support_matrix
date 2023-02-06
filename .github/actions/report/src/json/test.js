'use strict';
const uuid = require("../../../util/github_rest/uuid")

class Test {
    constructor({title, fullTitle, duration, passed, code}) {
        this.title = title || "Empty title";
        this.fullTitle = fullTitle || "Empty fullTitle";
        this.timedOut = null;
        this.duration = duration;
        this.state = passed ? "passed" : "failed";
        this.speed = "slow";
        this.pass = passed;
        this.fail = !passed;
        this.pending = false;
        this.context = null;
        this.code = code || "Extra field with info";
        this.err = {};
        this.uuid = uuid();
        this.parentUUID = null;
        this.isHook = false;
        this.skipped = false;
    }
}

module.exports = Test