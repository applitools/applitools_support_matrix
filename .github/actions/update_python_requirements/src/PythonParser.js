const CoreParser = require("../../util/versions/CoreParser")
const fetch = require("node-fetch");


class PythonParser extends CoreParser {

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
        this.packages_data = {}
    }

    async collect_data(packageName) {
        const reg_versions = /<title>\d+.\d+.\d+<\/title>/gm;
        const url = `https://pypi.org/rss/project/${packageName}/releases.xml`
        console.log(`used url: ${url}`)
        const raw_data = await fetch(url).then(res => res.text())
        this.packages_data[packageName] = raw_data.match(reg_versions).map(this.parseVersion).sort((a, b) => a.compare(b));
    }

    getLatest(packageName) {
        return this.packages_data[packageName][0]
    }

    getAllVersions(packageName) {
        return this.packages_data[packageName]
    }

}

module.exports = PythonParser

