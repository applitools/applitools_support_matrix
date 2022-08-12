'use strict'
const {getDuration} = require('../util/date')

class Stats {
    constructor({start, end}) {
        this.suites = 0;
        this.tests = 0;
        this.testsRegistered = 0;
        this.passes = 0;
        this.pending = 0;
        this.failures = 0;
        this.start = start;
        this.end = end;
        this.passPercent = 100;
        this.pendingPercent = 0;
        this.other = 0;
        this.hasOther = false;
        this.skipped = 0;
        this.hasSkipped = false;
        this.duration = getDuration(start, end);
    }

    addSuite(suite){
        this.suites++;
        const newTests = suite.tests.length;
        this.tests += newTests;
        this.testsRegistered += newTests;
        this.passes += suite.passes.length;
        this.failures += suite.failures.length;
    }
}

module.exports = Stats