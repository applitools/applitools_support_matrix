'use strict'
const uuid = require("../util/uuid")

class Suite {
    constructor({title, file, duration}) {
        this.uuid = uuid();
        this.title = title || 'Title not set';
        this.fullFile = file || "file";
        this.file = file || "file";
        this.beforeHooks = [];
        this.afterHooks = [];
        this.tests = [];
        this.suites = [];
        this.passes = [];
        this.failures = [];
        this.pending = [];
        this.skipped = [];
        this.duration = duration || 0;
        this.root = false;
        this.rootEmpty = false;
        this._timeout = 0;
    }

    addTest(test) {
        this.tests.push(test)
        if(test.pass) this.passes.push(test.uuid)
        if(test.fail) this.failures.push(test.uuid)
    }
}

module.exports = Suite