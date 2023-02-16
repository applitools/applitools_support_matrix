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
    const requirementsPath = path.join(cwd, "requirements.txt")
    let requirements = fs.readFileSync(requirementsPath).toString()
    const reg = new RegExp(`^${packageName}[=>~]{0,2}[\\d\.\*]*$`, 'gm')
    const newPackageLine = `${packageName}==${version}`
    if (reg.test(requirements)) {
        requirements = requirements.replace(reg, newPackageLine)
    } else {
        requirements = requirements.concat(`\n${newPackageLine}`)
    }
    fs.writeFileSync(requirementsPath, requirements)
}



module.exports = install

