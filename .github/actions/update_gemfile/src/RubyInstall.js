const path = require("path");
const fs = require("fs");


function install({source, version, packageName, cwd}) {
    switch (source) {
        case "remote":
            return remote({version, packageName, cwd})
        default:
            throw new Error(`Installer doesn't support installation from ${source}`)
    }
}

function remote({version, packageName, cwd}) {
    const gemfilePath = path.join(cwd, "Gemfile")
    let gemfile = fs.readFileSync(gemfilePath).toString()
    // gemfiles should be updated to the single quoted
    const reg = new RegExp(`^.*'${packageName}'.*$`, 'gm')
    const newGemString = `gem '${packageName}', '${version}'`
    if (reg.test(gemfile)) {
        gemfile = gemfile.replace(reg, newGemString)
    } else {
        gemfile = gemfile.concat(`\ngem '${packageName}', '${version}'`)
    }
    fs.writeFileSync(gemfilePath, gemfile)
}



module.exports = install

