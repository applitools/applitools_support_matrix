const CoreParser = require("../../util/versions/CoreParser")
const fetch = require("node-fetch");


class JavaParser extends CoreParser {

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
        const reg_versions = /<version>\d+.\d+.\d+<\/version>/gm;
        const urlPart = this.formURlpart(packageName)
        const raw_data = await fetch(`https://repo1.maven.org/maven2/${urlPart}/maven-metadata.xml`).then(res => res.text())
        this.packages_data[urlPart] = raw_data.match(reg_versions).map(this.parseVersion).sort((a, b) => a.compare(b));
    }

    getLatest(packageName) {
        return this.packages_data[this.formURlpart(packageName)][0]
    }

    getAllVersions(packageName) {
        return this.packages_data[this.formURlpart(packageName)]
    }

    formURlpart(packageName) {
        return `${packageName.groupId}/${packageName.artifactId}`.replace(".","/")
    }

}

module.exports = JavaParser

