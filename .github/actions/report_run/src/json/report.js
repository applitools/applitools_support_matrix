'use strict'
const Stats = require("./stats")
const Result = require("./result")

class Report {
    constructor({start, end}) {
        this.stats = new Stats({start,end});
        this.results = [new Result()];
    }

    addSuite(suite) {
        this.stats.addSuite(suite)
        this.results[0].addSuite(suite)
    }
}

module.exports = Report