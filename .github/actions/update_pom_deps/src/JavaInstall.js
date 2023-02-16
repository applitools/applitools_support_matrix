function install({source, version, packageName, cwd}) {
    switch (source) {
        case "remote":
            return remote({version, packageName, cwd})
        default:
            throw new Error(`Installer doesn't support installation from ${source}`)
    }
}

function remote({version, packageName, cwd}) {

}


module.exports = install

