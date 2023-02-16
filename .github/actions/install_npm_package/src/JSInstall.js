const {shellCommand} = require("../../util/common");


    function install({source, version, packageName, cwd}) {
        switch (source) {
            case "remote":
                return remote({version, packageName, cwd})
            default:
                throw new Error(`Installer doesn't support installation from ${source}`)
        }
    }

    function remote({version, packageName, cwd}) {
        shellCommand(`npm install ${packageName}@${version}`, cwd)
        const ls = shellCommand(`npm list`, cwd)
        const regResult = new RegExp(` (${packageName})@(.*)`).exec(ls)
        return {installed_name: regResult[1], installed_version: regResult[2]}
    }



module.exports = install

