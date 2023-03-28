const CoreParser = require("../../util/versions/CoreParser")
const fetch = require("node-fetch");


class SeleniumParser extends CoreParser {

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
        this.assets = []
    }

    async collect_data() {
        const SELENIUM_LATEST_RELEASES_INFO_URL = `https://api.github.com/repos/SeleniumHQ/selenium/releases/latest`
        console.log(`used url: ${SELENIUM_LATEST_RELEASES_INFO_URL}`)
        const raw_data = await fetch(SELENIUM_LATEST_RELEASES_INFO_URL).then(res => res.text())
        const data = JSON.parse(raw_data)
        const self = this;
        this.assets = data.assets
            .filter(as => as.name.includes("selenium-server") && as.name.includes(".jar"))
            .map(function (asset) {
                return {
                    version: self.parseVersion(asset.name),
                    name: asset.name,
                    download_url: asset.browser_download_url
                }
            })
            .sort((a, b) => a.version.compare(b.version));
    }

    getLatest() {
        return this.assets[0]
    }

    getAllVersions() {
        return this.assets
    }

}

module.exports = SeleniumParser