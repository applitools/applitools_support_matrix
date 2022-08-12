'use strict'
const uuid = require("../util/uuid")

class Result {
    constructor() {
        this.uuid = uuid();
        this.title = "";
        this.fullFile = "";
        this.file = "";
        this.beforeHooks = [];
        this.afterHooks = [];
        this.tests = [];
        this.suites = [];
        this.passes = [];
        this.failures = [];
        this.pending = [];
        this.skipped = [];
        this.duration = 0;
        this.root = true;
        this.rootEmpty = true;
        this._timeout = 0
    }

    addSuite(suite) {
        this.suites.push(suite)
    }
}

module.exports = Result