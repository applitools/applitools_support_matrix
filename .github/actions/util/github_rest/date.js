'use strict';

function getDuration(start, end) {
    return Date.parse(end) - Date.parse(start)
}

function compareDates(a, b) {
    return Date.parse(a) - Date.parse(b)
}

function getJobsDuration(jobs) {
    if (jobs && Array.isArray(jobs) && jobs.length !== 0) {
        const start = jobs.map(test => test.started_at).sort(compareDates)[0]
        const end = jobs.map(test => test.completed_at).sort(compareDates)[jobs.length - 1]
        return getDuration(start, end)
    }
    return 0;
}

module.exports = {
    getDuration,
    compareDates,
    getJobsDuration,
}