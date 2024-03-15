const {shellCommand} = require("../../util/common");


    function install({source, version, packageName, legacyNpmPeers, cwd}) {
        switch (source) {
            case "remote":
                return remote({version, packageName, legacyNpmPeers, cwd})
            default:
                throw new Error(`Installer doesn't support installation from ${source}`)
        }
    }

    function remote({version, packageName, legacyNpmPeers, cwd}) {
        let command = `npm install ${packageName}@${version} -E`
        if (legacyNpmPeers) command += ' --legacy-peer-deps'
        shellCommand(command, cwd)
        const ls = shellCommand(`npm list`, cwd)
        const regResult = new RegExp(` (${packageName})@(.*)`).exec(ls)
        return {installed_name: regResult[1], installed_version: regResult[2]}
    }



module.exports = install

