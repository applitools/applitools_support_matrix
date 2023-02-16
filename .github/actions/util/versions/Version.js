const {strToNum} = require("../common");

class Version {
    constructor({major, minor, patch}) {
        this.major = strToNum(major);
        this.minor = strToNum(minor);
        this.patch = strToNum(patch);
    }

    compare(another) {
        let result = compareNums(this.major, another.major)
        if (result === 0) result = compareNums(this.minor, another.minor)
        if (result === 0) result = compareNums(this.patch, another.patch)
        return result

        function compareNums(a, b) {
            if (a > b) return -1
            else if (a < b) return 1
            else return 0
        }
    }

    toString() {
        return `${this.major}.${this.minor}.${this.patch}`
    }

}

module.exports = Version