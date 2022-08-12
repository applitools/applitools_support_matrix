'use strict';

function getDuration(start, end) {
    return Date.parse(end) - Date.parse(start)
}

function compareDates(a,b) {
    return Date.parse(a) - Date.parse(b)
}

module.exports = {
    getDuration,
    compareDates,
}