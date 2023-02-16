const CoreParser = require("../../util/versions/CoreParser")
const {shellCommand} = require("../../util/common");

class RubyParser extends CoreParser {

    constructor() {
        super();
        this.getLatest = this.getLatest.bind(this)
        this.getAllVersions = this.getAllVersions.bind(this)
        this.getPreviousMinus = this.getPreviousMinus.bind(this)
        this.getMajorMinus = this.getMajorMinus.bind(this)
        this.getMinorMinus = this.getMinorMinus.bind(this)
        this.getPatchMinus = this.getPatchMinus.bind(this)
        this.parseVersion = this.parseVersion.bind(this)
        this.parseInputVersion = this.parseInputVersion.bind(this)
    }

    getLatest(packageName, cwd) {
        return this.getAllVersions(packageName, cwd)[0]
    }

    getAllVersions(packageName, cwd) {
        const commandRes = shellCommand(`gem info -ra ${packageName}`, cwd);
        const reg_versions = /\d+.\d+.\d+/gm;
        return commandRes.match(reg_versions).map(this.parseVersion).sort((a, b) => a.compare(b));
    }

}

module.exports = RubyParser

